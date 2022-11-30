// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
pragma experimental ABIEncoderV2;

import "./DydxFlashloanBase.sol";
import "./interfaces/ICallee.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import './interfaces/IWeth.sol';
import "./FlashloanV2Library.sol";
//import "./interfaces/IAggregationRouterV4.sol";
//import "./SwapProxy.sol";
//import "./AggregationRouterV4.sol";
import 'hardhat/console.sol';

contract Flashloan is ICallee, DydxFlashloanBase {
//contract Flashloan is ICallee, DydxFlashloanBase, IAggregationRouterV4, Ownable, Permitable {
  //using SafeERC20 for IERC20;
  enum Direction { KyberToUniswap, UniswapToKyber, OneinchToUniswap, UniswapToOneinch }

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

  //TODO add RangoExchange instead of Kyber
  //IUniswapV2Router02 uniswap;
  //SwapProxy aggregationRouter;
  address uniRouter;
  address aggRouter;
  address private owner;
  address beneficiary;

  event Log(string message, uint value);

  event NewArbitrage(
      Direction direction,
      uint profit,
      uint date
  );

  //address private constant KYBER_ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
  address private constant SOLO = 0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e;
  address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

  // One Inch Exchange Config
  //address private constant ONEINCH_V2_ROUTER = 0x111111125434b319222CdBf8C261674aDB56F3ae;
  //address private constant ONEINCH_V4_ROUTER = 0x1111111254fb6c44bAC0beD2854e76F90643097d;

  constructor(
      address uniswapAddress,
      address aggregatorAddress
  ) public {
    owner = msg.sender;
    uniRouter = uniswapAddress;
    aggRouter = aggregatorAddress;
    //uniswap = IUniswapV2Router02(uniswapAddress);
    //aggregationRouter = SwapProxy(aggregatorAddress);
    //beneficiary = beneficiaryAddress;
  }

  receive() external payable {
      // this built-in function doesn't require any calldata,
      // it will get called if the data field is empty and 
      // the value field is not empty.
      // this allows the smart contract to receive ether just like a 
      // regular user account controlled by a private key would.
      //assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
  }

  function _onlyOwner() private view {
      require(msg.sender == owner, 'only owner');
  }

  modifier onlyOwner() {
    //require(msg.sender == owner, 'only owner');
    _onlyOwner();
    _;
  }

  /*modifier onlyPool() {
    require(msg.sender == address(_pool), "Only pool can be sender.");
    _;
  }*/
  uint256 private constant _PARTIAL_FILL = 1 << 0;
  uint256 private constant _REQUIRES_EXTRA_ETH = 1 << 1;

  struct MyCustomData2 {
    uint direction;
    uint256 repayAmount; 
    IAggregationExecutor caller; 
    address srcToken; 
    address dstToken; 
    address payable srcReceiver; 
    address payable dstReceiver; 
    uint256 amount; 
    uint256 minReturnAmount; 
    uint256 flags;
    bytes permit; 
    bytes oneSwapParams;
    bytes oneSwapData;
  }
 
  function initiateFlashloan(
    bytes memory data
    ) external onlyOwner() {
      ISoloMargin solo = ISoloMargin(SOLO/*_solo*/);
      (MyCustomData2 memory mcd2) = abi.decode(data, (MyCustomData2));
      MyCustomData memory msd = MyCustomData({direction: Direction(mcd2.direction),
                                              repayAmount: mcd2.repayAmount,
                                              oneData: OneinchCaller(
                                                  { caller: mcd2.caller,
                                                    desc: SwapDescription({
                                                                srcToken: IERC20(mcd2.srcToken),
                                                                dstToken: IERC20(mcd2.dstToken),
                                                                srcReceiver: mcd2.srcReceiver,
                                                                dstReceiver: mcd2.dstReceiver,
                                                                amount: mcd2.amount,
                                                                minReturnAmount: mcd2.minReturnAmount,
                                                                flags: mcd2.flags,
                                                                permit: mcd2.permit
                                                        }),
                                                    oneSwapParams: mcd2.oneSwapParams,
                                                    oneSwapData: mcd2.oneSwapData
                                                  })
      });

      // Get marketId from token address
      uint256 marketId = _getMarketIdFromTokenAddress(SOLO, address(msd.oneData.desc.srcToken));
      console.log("marketId ", marketId);
      // Calculate repay amount (_amount + (2 wei))
      uint256 repay = _getRepaymentAmountInternal(msd.oneData.desc.amount);
      console.log("repayAmount ", repay);
      console.log("smart contract balance (flashloan)");
      console.log("srcToken ", IERC20(msd.oneData.desc.srcToken).balanceOf(address(this)));
      console.log("dstToken ", IERC20(msd.oneData.desc.dstToken).balanceOf(address(this)));
      console.log("SOLO contract balance (flashloan)");
      console.log("srcToken ", IERC20(msd.oneData.desc.srcToken).balanceOf(msg.sender));
      console.log("dstToken ", IERC20(msd.oneData.desc.dstToken).balanceOf(msg.sender));
      //IERC20(msd.oneData.desc.srcToken).approve(SOLO, repay);
      // 1. Withdraw $
      // 2. Call callFunction(...)
      // 3. Deposit back $
      Actions.ActionArgs[] memory operations = new Actions.ActionArgs[](3);
      operations[0] = _getWithdrawAction(marketId, msd.oneData.desc.amount);
      operations[1] = _getCallAction(
          abi.encode(MyCustomData({ direction: msd.direction,
                                    repayAmount: repay,
                                    oneData: msd.oneData
                                    }))
      );
      operations[2] = _getDepositAction(marketId, repay);
      Account.Info[] memory accountInfos = new Account.Info[](1);
      accountInfos[0] = _getAccountInfo();
      solo.operate(accountInfos, operations);
      console.log("flashloan completed...");
  }

  // This is the function that will be called postLoan
  // i.e. Encode the logic to handle your flashloaned funds here
  function callFunction(
      address sender,
      Account.Info memory account,
      bytes memory data
  ) public override {
  //) public override onlyOwner() {
    require(msg.sender == SOLO, "!solo");
    require(sender == address(this), "!this contract");

    //ArbInfo memory arbInfo = abi.decode(data, (ArbInfo));
    MyCustomData memory msd = abi.decode(data, (MyCustomData));
    console.log("data ");
    console.logBytes(msd.oneData.oneSwapData);

    IERC20 fromToken = IERC20(msd.oneData.desc.srcToken);
    IERC20 toToken = IERC20(msd.oneData.desc.dstToken);

    uint256 balanceSrcToken = fromToken.balanceOf(address(this));
    // Track the balance of the token RECEIVED from the trade
    //uint256 _beforeBalance = IERC20(_toToken).balanceOf(address(this));
    console.log("balanceSrcToken ", balanceSrcToken);
    console.log("smart contract balance (callFunction)");
    console.log("srcToken ", IERC20(msd.oneData.desc.srcToken).balanceOf(address(this)));
    console.log("dstToken ", IERC20(msd.oneData.desc.dstToken).balanceOf(address(this)));
    console.log("SOLO contract balance (callFunction)");
    console.log("srcToken ", IERC20(msd.oneData.desc.srcToken).balanceOf(msg.sender));
    console.log("dstToken ", IERC20(msd.oneData.desc.dstToken).balanceOf(msg.sender));
    //console.log("repay        ", arbInfo.repayAmount);

    //enum Direction { KyberToUniswap, UniswapToKyber, OneinchToUniswap, UniswapToOneinch } 
    if (msd.direction == Direction.OneinchToUniswap) {
      console.logString("Executing 1Inch -> Uniswap Arb opportunity...");
    }

    if (msd.direction == Direction.UniswapToOneinch) {
      console.logString("Executing Uniswap -> 1Inch Arb opportunity...");

      (uint256 uniReceivedAmt) = FlashloanV2Library.tradeUniswapToOneinch(uniRouter, aggRouter, balanceSrcToken, data);
      console.log("uniReceivedAmt ", uniReceivedAmt);

      // Validate there is enough token balance on this contract to repay the dy/dx flashloan
      //require(balanceSrcToken >= msd.repayAmount, "Not enough token balance to repay the dy/dx flashloan");
      balanceSrcToken = fromToken.balanceOf(address(this));
      console.log("balanceSrcToken ", balanceSrcToken);
      console.log("msd.repayAmount ", msd.repayAmount);
      require(balanceSrcToken >= msd.repayAmount, "Not enough token balance to repay the dy/dx flashloan");

      // Withdraw the profit from the flashloan and send it to an address of our own
      //uint profit = dai.balanceOf(address(this)) - arbInfo.repayAmount;
      //dai.transferFrom(address(this), beneficiary, profit);
      uint profit = balanceSrcToken - msd.repayAmount;
      fromToken.transferFrom(address(this), beneficiary, profit);

      emit Log("bal         ", balanceSrcToken);
      emit Log("repay       ", msd.repayAmount);
      emit Log("bal - repay ", balanceSrcToken - msd.repayAmount);

      //emit NewArbitrage(arbInfo.direction, profit, now);
      emit NewArbitrage(msd.direction, profit, block.timestamp);
    }
  }
}