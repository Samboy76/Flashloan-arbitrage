// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//import "./interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
//import "./OneInchExchange.sol";
//import "./interfaces/IOneInchCaller.sol";
//import "./interfaces/IAggregationRouterV4.sol";
import "./interfaces/IAggregationExecutor.sol";
//import "./SwapProxy.sol";
//import "./AggregationRouterV4.sol";
//import "./Permitable.sol";
import "./helpers/UniERC20.sol";
import "solidity-bytes-utils/contracts/BytesLib.sol";
import 'hardhat/console.sol';

library FlashloanV2Library {
  using UniERC20 for IERC20;
  using SafeMath for uint256;
  using SafeERC20 for IERC20;
  using BytesLib for bytes; // new line added for BytesLib.sol

  enum Direction { KyberToUniswap, UniswapToKyber, OneinchToUniswap, UniswapToOneinch }

  address constant private WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  address constant private ONEINCH_TOKEN_PROXY_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
  
  // Struct to pass calldata
  struct SwapDescription {
        IERC20 srcToken;
        IERC20 dstToken;
        address srcReceiver;
        address dstReceiver;
        uint256 amount;
        uint256 minReturnAmount;
        uint256 flags;
        bytes permit;
  }

  struct OneinchCaller {
    IAggregationExecutor caller;
    SwapDescription desc;
    bytes oneSwapParams;
    bytes oneSwapData;
  }

  struct MyCustomData {
      Direction direction;
      uint256 repayAmount;
      OneinchCaller oneData;
  }

  struct OneSwapParams {
      address fromTokenAddress;    // OTHER
      address toTokenAddress;      // WETH
      uint256 amount;
      address fromAddress;
      uint slippage;
      bool disableEstimate;
      bool allowPartialFill;
  }

  //function tradeUniswapToOneinch(IUniswapV2Router02 uniswap, SwapProxy aggregationRouter, uint256 balanceSrcToken, bytes memory data) 
  function tradeUniswapToOneinch(address uniswap, address oneinch, uint256 balanceSrcToken, bytes memory data) 
  public returns (uint256) {
  //public returns (bytes memory, uint256, uint256) {
    MyCustomData memory msd = abi.decode(data, (MyCustomData));
    // Track the balance of the token RECEIVED from the trade
    IERC20 fromToken = IERC20(msd.oneData.desc.srcToken);
    IERC20 toToken = IERC20(msd.oneData.desc.dstToken);
    uint256 _beforeBalance = toToken.balanceOf(address(this));

    //(uint oneReceivedAmt,) = oneSwap/*{ value: msg.value }*/(oneinch, balanceSrcToken, data);
    oneSwap/*{ value: msg.value }*/(oneinch, balanceSrcToken, data);

    // Calculate the how much of the token we received
    uint256 _afterBalance = toToken.balanceOf(address(this));

    // Read _toToken balance after swap
    uint256 _toAmount = _afterBalance - _beforeBalance;

    uint256 uniReceivedAmt = uniSwap(uniswap, address(toToken), address(fromToken), _toAmount);
    /*
    //uint256 uniReceivedAmt = 0;
    IUniswapV2Router02 uniRouter = IUniswapV2Router02(uniswap);
    address[] memory path = new address[](2);
    uint[] memory minOuts = new uint[](2);
    path[0] = address(toToken);
    path[1] = address(fromToken);
    console.log("***_toAmount                   ", _toAmount);
    fromToken.approve(address(uniRouter), _toAmount - 4000000000000000000);
    minOuts = uniRouter.getAmountsOut(_toAmount - 4000000000000000000, path);
    //console.log("***_toAmount                   ", minOuts[0]);
    console.log("***uniReceivedAmt (sub-4)      ", minOuts[1]);
    fromToken.approve(address(uniRouter), _toAmount);
    minOuts = uniRouter.getAmountsOut(_toAmount, path); 
    console.log("***uniReceivedAmt (unchanged)  ", minOuts[1]);
    fromToken.approve(address(uniRouter), _toAmount + 4000000000000000000);
    minOuts = uniRouter.getAmountsOut(_toAmount + 4000000000000000000, path); 
    console.log("***uniReceivedAmt (add+4)      ", minOuts[1]);
    fromToken.approve(address(uniRouter), _toAmount + 8000000000000000000);
    minOuts = uniRouter.getAmountsOut(_toAmount + 8000000000000000000, path); 
    console.log("***uniReceivedAmt (add+8)      ", minOuts[1]);
    fromToken.approve(address(uniRouter), _toAmount + 12000000000000000000);
    minOuts = uniRouter.getAmountsOut(_toAmount + 12000000000000000000, path); 
    console.log("***uniReceivedAmt (add+12)      ", minOuts[1]);

    return (0);
    */
    return (uniReceivedAmt);
  }

  // Swap tokens on Uniswap exchange 
  //function uniSwap(IUniswapV2Router02 uniswap, address _from, address _to, uint256 _amount) internal returns (uint256) {
  function uniSwap(address uniswap, address _from, address _to, uint256 _amount) internal returns (uint256) {
    //uint256 balance = other.balanceOf(address(this));
    // Setup contracts
    //MyCustomData memory msd = abi.decode(data, (MyCustomData));
    IUniswapV2Router02 uniRouter = IUniswapV2Router02(uniswap);
    IERC20 fromIERC20 = IERC20(_from);
    //IERC20 toIERC20 = IERC20(_from);
    //other.approve(address(uniswap), _amount);
    fromIERC20.approve(uniswap, _amount);
    address[] memory path = new address[](2);

    path[0] = _from;
    path[1] = _to;

    uint[] memory minOuts = uniRouter.getAmountsOut(_amount, path); 
    uint256 amountReceived = uniRouter.swapExactTokensForTokens(
                              _amount,
                              minOuts[1], 
                              path, 
                              address(this),
                              block.timestamp
    )[1];

    return amountReceived;
  }

  // Swap tokens on 1Inch exchange
  function oneSwap(address oneinch, uint minOut, bytes memory _data) internal returns (uint newReturnAmount, uint newGasLeft) {
      MyCustomData memory msd = abi.decode(_data, (MyCustomData));
      OneSwapParams memory osp = abi.decode(msd.oneData.oneSwapParams, (OneSwapParams));

      console.log("fromTokenAddress ", osp.fromTokenAddress);
      console.log("amount           ", osp.amount);
      IERC20(osp.fromTokenAddress).approve(oneinch, osp.amount);
      console.log("msd.oneData.oneSwapData ");
      console.logBytes(msd.oneData.oneSwapData);
      (bool succ, bytes memory data) = oneinch.call(msd.oneData.oneSwapData);
      console.log("succ ", succ);
      console.log("data ");
      console.logBytes(data);

      if (succ) {
          //(uint returnAmount, uint gasLeft) = abi.decode(data, (uint, uint));
          bytes memory toBeConvert;
          bytes32 converted;
          uint128 a;
          bytes16 b;

          // Converting "gasLeft" into bytes16 value
          bytes memory gasLeft = data.slice(0, 16);
          toBeConvert = gasLeft;
          assembly {
              converted := mload(add(toBeConvert, 32))
          }
          a = uint128(bytes16(converted));
          b = bytes16(a);
          uint128 gasLeftUint = uint128(bytes16(b));
          console.log("gasLeftUint (converted)      ", gasLeftUint);

          // Converting "returnAmount" into bytes16 value
          bytes memory returnAmount = data.slice(16, 16);
          toBeConvert = returnAmount;
          assembly {
              converted := mload(add(toBeConvert, 32))
          }
          a = uint128(bytes16(converted));
          b = bytes16(a);
          uint128 returnAmountUint = uint128(bytes16(b));
          console.log("returnAmountUint (converted) ", returnAmountUint);

          newReturnAmount = returnAmountUint;
          newGasLeft = gasLeftUint;
          //require(returnAmount >= minOut);
          require(newReturnAmount >= minOut);
      } else {
          revert();
      }
  }
}
