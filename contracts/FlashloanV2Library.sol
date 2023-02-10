// SPDX-License-Identifier: MIT
//pragma solidity 0.6.12;
pragma solidity 0.8.10;
//pragma solidity >=0.6.12 <=0.7.6;
//pragma experimental ABIEncoderV2;
pragma abicoder v2;

import '@uniswap/v3-core/contracts/interfaces/callback/IUniswapV3FlashCallback.sol';
import './uniswapV3/core/LowGasSafeMath.sol';

import './uniswapV3/periphery/PeripheryPayments.sol';
import './uniswapV3/periphery/PeripheryImmutableState.sol';
//import '@uniswap/v3-periphery/contracts/libraries/PoolAddress.sol';
import './uniswapV3/periphery/CallbackValidation.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import './uniswapV3/periphery/ISwapRouter.sol';

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
//import "./UniswapV2Library.sol";
//import "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "./helpers/UniERC20.sol";
import "solidity-bytes-utils/contracts/BytesLib.sol";
import 'hardhat/console.sol';

library FlashloanV2Library {
  using UniERC20 for IERC20;
  using SafeMath for uint256;
  using SafeERC20 for IERC20;
  using BytesLib for bytes; // new line added for BytesLib.sol

  enum Direction { UniswapToOneinch, OneinchToUniswap, UniswapToUniswap, UniswapToZeroX, ZeroXToUniswap }

  address constant private ZERO_ADDRESS = 0x0000000000000000000000000000000000000000;
  //address constant private WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  //address constant private ONEINCH_TOKEN_PROXY_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
  
  // Struct to pass calldata
  struct OneinchCaller {
    bytes oneSwapParams;
    bytes oneSwapData;
  }

  struct MyCustomData {
    Direction direction;
    uint256 borrowAmount;
    address swapRouter;
    uint24 fee;
    address weth;
    address cheapRouter;
    address expensiveRouter;
    address payable metawallet;
    address payable wallet;
    OneinchCaller oneData;
  }

  struct OneSwapParams {
      address fromTokenAddress;
      address toTokenAddress;
      uint256 amount;
      address fromAddress;
      uint slippage;
      bool disableEstimate;
      bool allowPartialFill;
  }

  function tradeUniswapToUniswap(bytes memory data) 
  public returns (uint) {
    MyCustomData memory msd = abi.decode(data, (MyCustomData));
    OneSwapParams memory osp = abi.decode(msd.oneData.oneSwapParams, (OneSwapParams));

    // Track the balance of the token RECEIVED from the trade
    IERC20 toToken = IERC20(osp.toTokenAddress);
    uint256 _beforeBalance = toToken.balanceOf(address(this));

    uniSwap(osp.amount, data, false);

    // Calculate the how much of the token we received
    uint256 _afterBalance = toToken.balanceOf(address(this));

    // Read _toToken balance after swap
    uint256 _toAmount = _afterBalance - _beforeBalance;

    uint256 receivedAmount = uniSwap(_toAmount, data, true);

    return receivedAmount;
  }

  /*
  function tradeOneinchToUniswap(bytes memory data) 
  public returns (uint) {
    MyCustomData memory msd = abi.decode(data, (MyCustomData));
    //OneSwapParams memory osp = abi.decode(msd.oneData.oneSwapParams, (OneSwapParams));

    // Track the balance of the token RECEIVED from the trade
    //IERC20 toToken = IERC20(osp.fromTokenAddress);
    //uint256 _beforeBalance = toToken.balanceOf(address(this));

    uniSwap(msd.borrowAmount, data, false);

    // Calculate the how much of the token we received
    //uint256 _afterBalance = toToken.balanceOf(address(this));

    // Read _toToken balance after swap
    //uint256 _toAmount = _afterBalance - _beforeBalance;

    (uint256 receivedAmount,) = oneinchSwap(data);//{ value: msg.value }

    return receivedAmount;
  }

  function tradeUniswapToOneinch(bytes memory data) 
  public returns (uint) {
    MyCustomData memory msd = abi.decode(data, (MyCustomData));
    OneSwapParams memory osp = abi.decode(msd.oneData.oneSwapParams, (OneSwapParams));

    // Track the balance of the token RECEIVED from the trade
    IERC20 toToken = IERC20(osp.toTokenAddress);
    uint256 _beforeBalance = toToken.balanceOf(address(this));

    oneinchSwap(data);//{ value: msg.value }

    // Calculate the how much of the token we received
    uint256 _afterBalance = toToken.balanceOf(address(this));

    // Read _toToken balance after swap
    uint256 _toAmount = _afterBalance - _beforeBalance;

    uint256 receivedAmount = uniSwap(_toAmount, data, true);

    return receivedAmount;
  }

  // Swap tokens on 1Inch exchange
  function oneinchSwap(bytes memory _data) internal returns (uint newReturnAmount, uint newGasLeft) {
      MyCustomData memory msd = abi.decode(_data, (MyCustomData));
      OneSwapParams memory osp = abi.decode(msd.oneData.oneSwapParams, (OneSwapParams));

      console.log("1INCH");
      console.log("fromTokenAddress ", osp.fromTokenAddress);
      console.log("amount           ", osp.amount);
      if (msd.direction == Direction.OneinchToUniswap)
        IERC20(osp.fromTokenAddress).approve(msd.cheapRouter, osp.amount);
      if (msd.direction == Direction.UniswapToOneinch)
        IERC20(osp.fromTokenAddress).approve(msd.expensiveRouter, osp.amount);
      console.log("msd.oneData.oneSwapData ");
      console.logBytes(msd.oneData.oneSwapData);
      console.log("BEFORE 1INCH SWAP");
      console.log("fromTokenAddress bal ", IERC20(osp.fromTokenAddress).balanceOf(address(this)));
      console.log("toTokenAddress bal   ", IERC20(osp.toTokenAddress).balanceOf(address(this)));
      bool succ;
      bytes memory data;
      if (msd.direction == Direction.OneinchToUniswap)
        (succ, data) = (msd.cheapRouter).call(msd.oneData.oneSwapData);
      if (msd.direction == Direction.UniswapToOneinch)
        (succ, data) = (msd.expensiveRouter).call(msd.oneData.oneSwapData);
      console.log("POST 1INCH SWAP");
      console.log("fromTokenAddress bal ", IERC20(osp.fromTokenAddress).balanceOf(address(this)));
      console.log("toTokenAddress bal   ", IERC20(osp.toTokenAddress).balanceOf(address(this)));
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
          //require(newReturnAmount >= minOut);
      } else {
          revert();
      }
  }*/

  struct Uniswap {
      IUniswapV2Router02 uniRouter;
      ISwapRouter swapRouter;
      IERC20 fromIERC20;
      IERC20 toIERC20;
      bool success;
      bytes data;
      uint256 amountReceived;
      uint256 feeAmount;
      uint256 amount0Min;
  }
  // Swap tokens on Uniswap exchange 
  function uniSwap(uint amount, bytes memory _data, bool flag) internal returns (uint256) {
    MyCustomData memory msd = abi.decode(_data, (MyCustomData));
    OneSwapParams memory osp = abi.decode(msd.oneData.oneSwapParams, (OneSwapParams));
    Uniswap memory uni;

    if (flag) {
      // true => Sell OTHER at cheapRouter
      //uniRouter = IUniswapV2Router02(msd.cheapRouter);
      if (msd.cheapRouter != msd.swapRouter)
        uni.uniRouter = IUniswapV2Router02(msd.cheapRouter); // cheapRouter is Uniswap V2 fork
      if (msd.cheapRouter == msd.swapRouter)
        uni.swapRouter = ISwapRouter(msd.swapRouter);        // cheapRouter is Uniswap V3
      uni.fromIERC20 = IERC20(osp.toTokenAddress);
      uni.toIERC20 = IERC20(osp.fromTokenAddress);
    } else {
      // false => Buy OTHER at expensiveRouter
      //uniRouter = IUniswapV2Router02(msd.expensiveRouter);
      if (msd.expensiveRouter != msd.swapRouter)
        uni.uniRouter = IUniswapV2Router02(msd.expensiveRouter);  // expensiveRouter is Uniswap V2 fork
      if (msd.expensiveRouter == msd.swapRouter)
        uni.swapRouter = ISwapRouter(msd.swapRouter);             // expensiveRouter is Uniswap V3
      /*if (msd.direction == Direction.OneinchToUniswap)
      {
        fromIERC20 = IERC20(osp.toTokenAddress);
        toIERC20 = IERC20(osp.fromTokenAddress);
      }*/
      if (/*msd.direction == Direction.UniswapToOneinch || */msd.direction == Direction.UniswapToUniswap)
      {
        //console.log("Direction.UniswapToUniswap");
        uni.fromIERC20 = IERC20(osp.fromTokenAddress);
        uni.toIERC20 = IERC20(osp.toTokenAddress);
      }
    }

    //bool success = fromIERC20.approve(address(uniRouter), amount);
    if (address(uni.uniRouter) != ZERO_ADDRESS && address(uni.swapRouter) == ZERO_ADDRESS)
    {
      uni.fromIERC20.safeIncreaseAllowance(address(uni.uniRouter), amount);
      //uni.success = uni.fromIERC20.approve(address(uni.uniRouter), amount);
    }
    if (address(uni.swapRouter) != ZERO_ADDRESS && address(uni.uniRouter) == ZERO_ADDRESS)
    {
      uni.fromIERC20.safeIncreaseAllowance(address(uni.swapRouter), amount);
      //uni.success = uni.fromIERC20.approve(address(uni.swapRouter), amount);
    }
    //require(uni.success, "Failed granting approval to uniRouter to spend amount");

    address[] memory path = new address[](2);
    path[0] = address(uni.fromIERC20);
    path[1] = address(uni.toIERC20);

    //uint256 amountReceived;
    uint[] memory minOuts;
    if (address(uni.uniRouter) != ZERO_ADDRESS && address(uni.swapRouter) == ZERO_ADDRESS)
    {
      minOuts = uni.uniRouter.getAmountsOut(amount, path);
      minOuts[1] = minOuts[1].mul(95).div(100); //TODO reduced %slippage to fix Uniswap K error (95% orig value)

      // Need to approve "uniRouter" to spend "amount" before invoking as the caller of this function
      uni.amountReceived = uni.uniRouter.swapExactTokensForTokens(
                                amount,
                                minOuts[1], 
                                path, 
                                address(this),
                                block.timestamp
      )[1];
    }
    if (address(uni.swapRouter) != ZERO_ADDRESS && address(uni.uniRouter) == ZERO_ADDRESS)
    {
      // profitable check
      // exactInputSingle will fail if this amount not met
      uni.feeAmount = (amount.div(1000000).mul(1000000+msd.fee)).sub(amount);
      //Read below article to address/fix "reverted with reason string 'Too little received'" issue:
      //https://techsmagic.com/how-to-fix-fail-with-error-too-little-received-uniswap-steps
      uni.amount0Min = 0;//LowGasSafeMath.add(amount, uni.feeAmount);
      /*console.log("fee                            ", msd.fee);
      console.log("fee amount                     ", uni.feeAmount);
      console.log("amount0Min                     ", uni.amount0Min);*/

      // call exactInputSingle for swapping token1 for token0 in pool w/fee2
      uni.amountReceived =
        uni.swapRouter.exactInputSingle(
            ISwapRouter.ExactInputSingleParams({
                tokenIn: path[0],
                tokenOut: path[1],
                fee: msd.fee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amount,
                amountOutMinimum: uni.amount0Min,
                sqrtPriceLimitX96: 0
            })
      );
    }

    /*if (address(uni.uniRouter) != ZERO_ADDRESS && address(uni.swapRouter) == ZERO_ADDRESS)
      console.log("uniRouter                      ", address(uni.uniRouter));
    if (address(uni.swapRouter) != ZERO_ADDRESS && address(uni.uniRouter) == ZERO_ADDRESS)
      console.log("swapRouter                     ", address(uni.swapRouter));
    console.log("_from                          ", address(uni.fromIERC20));
    console.log("_to                            ", address(uni.toIERC20));
    console.log("amount                         ", amount);
    if (address(uni.uniRouter) != ZERO_ADDRESS && address(uni.swapRouter) == ZERO_ADDRESS)
      console.log("minOuts                        ", minOuts[1]);
    console.log("amountReceived                 ", uni.amountReceived);*/

    if (address(uni.uniRouter) != ZERO_ADDRESS && address(uni.swapRouter) == ZERO_ADDRESS)
      uni.fromIERC20.safeDecreaseAllowance(address(uni.uniRouter), 0);
    if (address(uni.swapRouter) != ZERO_ADDRESS && address(uni.uniRouter) == ZERO_ADDRESS)
      uni.fromIERC20.safeDecreaseAllowance(address(uni.swapRouter), 0);

    return uni.amountReceived;
  }
  // swapExactTokensForTokens
  /*function swapExactTokensForTokens(bool _avoidKError, address router, IUniswapV2Pair pair, address from, address to, uint amountOutMin) internal returns (uint[] memory amounts) {
    tempStruct memory tempoStr;
    tempoStr.avoidKError = _avoidKError;

    tempoStr.uniRouter = IUniswapV2Router02(router);
    tempoStr.pairAddress = pair;
    IERC20 fromIERC20 = IERC20(from);
    IERC20 toIERC20 = IERC20(to);

    address[] memory path = new address[](2);
    path[0] = address(fromIERC20);
    path[1] = address(toIERC20);

    amounts = tempoStr.uniRouter.getAmountsOut(fromIERC20.balanceOf(address(this)), path);
    console.log("amounts[0]                   ", amounts[0]);
    console.log("amounts[1]                   ", amounts[1]);
    require(amounts[amounts.length - 1] >= amountOutMin, 'FlashloanV2Library: INSUFFICIENT_OUTPUT_AMOUNT');

    bool approvesuniRouterSuccess = fromIERC20.approve(address(tempoStr.uniRouter), amounts[0]);
    require(approvesuniRouterSuccess, "!approvesuniRouterSuccess");
    bool approvePairAddressSuccess = fromIERC20.approve(address(tempoStr.pairAddress), amounts[0]);
    require(approvePairAddressSuccess, "!approvePairAddressSuccess");
    console.log("allowance (uniRouter)        ", fromIERC20.allowance(address(this), address(tempoStr.uniRouter)));
    console.log("allowance (pairAddress)      ", fromIERC20.allowance(address(this), address(tempoStr.pairAddress)));
    console.log("address(this)                ", address(this));
    console.log("address(msg.sender)          ", address(msg.sender));  //aave lending pool
    console.log("address(pairAddress)         ", address(tempoStr.pairAddress)); // sashimi pairAddress
    console.log("token                        ", address(fromIERC20));
    bool success = fromIERC20.transfer(address(tempoStr.pairAddress), amounts[0]);
    console.log("success (transfer)           ", success);
    require(success, "FlashloanV2Library: TRANSFER_FROM_FAILED");
    console.log("========================================================");
    console.log("UNISWAP (transfer)");
    console.log("fromIERC20 bal               ", fromIERC20.balanceOf(address(this)));
    console.log("toIERC20 bal                 ", toIERC20.balanceOf(address(this)));
    console.log("fromIERC20 bal (pairAddress) ", fromIERC20.balanceOf(address(tempoStr.pairAddress)));
    console.log("========================================================");

    tempoStr.amountOut = amounts[1];
    (tempoStr.input, tempoStr.output) = (path[0], path[1]);
    // Sorting tokens
    tempoStr.tokenA = tempoStr.input;
    tempoStr.tokenB = tempoStr.output;
    require(tempoStr.tokenA != tempoStr.tokenB, 'FlashloanV2Library: IDENTICAL_ADDRESSES');
    (tempoStr.token0, tempoStr.token1) = tempoStr.tokenA < tempoStr.tokenB ? (tempoStr.tokenA, tempoStr.tokenB) : (tempoStr.tokenB, tempoStr.tokenA);
    require(tempoStr.token0 != address(0), 'FlashloanV2Library: ZERO_ADDRESS');
    (tempoStr.amount0Out, tempoStr.amount1Out) = tempoStr.input == tempoStr.pairAddress.token0() ? (uint(0), tempoStr.amountOut) : (tempoStr.amountOut, uint(0));
    console.log("amount0Out                   ", tempoStr.amount0Out);
    console.log("amount1Out                   ", tempoStr.amount1Out);
    //console.log("amount1Out (+1)              ", (tempoStr.amount1Out+1));
    //TODO added +1 to "from" token amount to fix Uniswap K error
    //console.log("amounts[0] (before) ", amounts[0]);
    //tempoStr.amountOut = (!avoidKError ? amounts[0]: amounts[0] + 1);
    //console.log("amounts[0] (after)  ", amounts[0]);
    tempoStr.pairAddress.swap(tempoStr.amount0Out, tempoStr.amount1Out, address(this), new bytes(0));
    //tempoStr.pairAddress.swap(tempoStr.amount0Out, (tempoStr.avoidKError ? tempoStr.amount1Out+1 : tempoStr.amount1Out), address(this), new bytes(0));
  }*/
}