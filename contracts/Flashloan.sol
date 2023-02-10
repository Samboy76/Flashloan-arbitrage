// SPDX-License-Identifier: MIT
//pragma solidity 0.6.12;
pragma solidity 0.8.10;
//pragma solidity >=0.6.12 <=0.7.6;
//pragma solidity 0.7.0;
//pragma experimental ABIEncoderV2;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
//import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';
import "./FlashloanV2Library.sol";
// Aave V2
//import { FlashLoanReceiverBase } from "@aave/protocol-v2/contracts/flashloan/base/FlashLoanReceiverBase.sol";
//import { ILendingPool } from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
//import { ILendingPoolAddressesProvider } from "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";
////import { FlashLoanSimpleReceiverBase } from "./aaveV3/FlashLoanSimpleReceiverBase.sol";
////import { FlashLoanSimpleReceiverBase } from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import { IFlashLoanSimpleReceiver } from "@aave/core-v3/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver.sol";
import { IPool } from "@aave/core-v3/contracts/interfaces/IPool.sol";
import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import 'hardhat/console.sol';

interface IWETH is IERC20 {

  function deposit() external payable;

  function withdraw(uint256 wad) external;
}

// SAM FIX - replaced original constructor to pass in two arguments instead of only IPoolAddressesProvider
// as a workaround to an identified bug in Aave V3:
// 1) IPoolAddressesProvider
// 2) pool address of a given chain network 
abstract contract FlashLoanSimpleReceiverBase is IFlashLoanSimpleReceiver {
  IPoolAddressesProvider public immutable override ADDRESSES_PROVIDER;
  IPool public immutable override POOL;

  ////constructor(IPoolAddressesProvider provider) {
  constructor(IPoolAddressesProvider provider, address _poolAddress) {
    ADDRESSES_PROVIDER = provider;
    //POOL = IPool(provider.getPool());
    POOL = IPool(_poolAddress);
  }
}

/** 
  !!!
  Never keep funds permanently on your FlashLoanReceiverBase contract as they could be 
  exposed to a 'griefing' attack, where the stored funds are used by an attacker.
  !!!
*/
// Aave V2
//contract Flashloan is FlashLoanReceiverBase {
contract Flashloan is FlashLoanSimpleReceiverBase  {
  using SafeMath for uint256;
  using SafeERC20 for IERC20;
  enum Direction { UniswapToOneinch, OneinchToUniswap, UniswapToUniswap, UniswapToZeroX, ZeroXToUniswap }

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

  // ACCESS CONTROL
  //address private owner;
  address payable owner;

  address WETH;

  event Log(string message, uint value);

  event NewArbitrage(
      Direction direction,
      uint profit,
      uint date
  );

  // Retrieve LendingPool address
  //ILendingPoolAddressesProvider provider = ILendingPoolAddressesProvider(address(0xAcc030EF66f9dFEAE9CbB0cd1B25654b82cFA8d5)); // mainnet address, for other addresses: https://docs.aave.com/developers/deployed-contracts/deployed-contract-instances 
  // Aave V2
  /*constructor(ILendingPoolAddressesProvider _addressProvider) FlashLoanReceiverBase(_addressProvider) public {
    owner = msg.sender;
  }*/
  // SAM FIX - replaced original constructor to pass in two arguments instead of only IPoolAddressesProvider
  // as a workaround to an identified bug in Aave V3
  ////constructor(address _addressProvider) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider))
  constructor(address _addressProvider, address _poolAddress) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider), _poolAddress)
  {
    owner = payable(msg.sender);
  }

  receive() external payable {
    // this built-in function doesn't require any calldata,
    // it will get called if the data field is empty and 
    // the value field is not empty.
    // this allows the smart contract to receive ETH just like a 
    // regular user account controlled by a private key would.
    assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
  }

  /*function withdraw(address _tokenAddress) external onlyOwner {
    IERC20 token = IERC20(_tokenAddress);
    token.transfer(msg.sender, token.balanceOf(address(this)));
  }*/
  
  function _onlyOwner() private view {
    require(msg.sender == owner, 'Only the contract owner can call this function');
  }

  modifier onlyOwner() {
    _onlyOwner();
    _;
  }

  /*modifier onlyPool() {
    require(msg.sender == address(_pool), "Only pool can be sender.");
    _;
  }*/

  struct MyCustomData2 {
    uint direction;
    uint256 borrowAmount;
    address swapRouter;
    uint24 fee;
    address weth;
    address cheapRouter;
    address expensiveRouter;
    address payable metawallet;
    address payable wallet;
    bytes oneSwapParams;
    bytes oneSwapData;
  }

  function flashloan(
    bytes memory data
    ) external onlyOwner() {
    (MyCustomData2 memory mcd2) = abi.decode(data, (MyCustomData2));
      OneSwapParams memory osp = abi.decode(mcd2.oneSwapParams, (OneSwapParams));
      MyCustomData memory msd = MyCustomData({direction: Direction(mcd2.direction),
                                              borrowAmount: mcd2.borrowAmount,
                                              swapRouter: mcd2.swapRouter,
                                              fee: mcd2.fee,
                                              weth: mcd2.weth,
                                              cheapRouter: mcd2.cheapRouter,
                                              expensiveRouter: mcd2.expensiveRouter,
                                              metawallet: mcd2.metawallet,
                                              wallet: mcd2.wallet,
                                              oneData: OneinchCaller(
                                                { 
                                                  oneSwapParams: mcd2.oneSwapParams,
                                                  oneSwapData: mcd2.oneSwapData
                                                }
                                              )
    });
    bytes memory params = abi.encode(msd);

    address receiverAddress = address(this); // smart contract to receive the flashloaned funds

    //address[] memory assets = new address[](2);
    address[] memory assets = new address[](1);
    assets[0] = address(osp.fromTokenAddress);
    //assets[1] = address(INSERT_ASSET_TWO_ADDRESS);

    //uint256[] memory amounts = new uint256[](2);
    uint256[] memory amounts = new uint256[](1);
    //amounts[0] = osp.amount;
    amounts[0] = msd.borrowAmount;
    //amounts[1] = INSERT_ASSET_TWO_AMOUNT;

    // 0 = no debt, 1 = stable, 2 = variable
    //uint256[] memory modes = new uint256[](2);
    uint256[] memory modes = new uint256[](1);
    modes[0] = 0; // Don't open any debt, just revert
    //modes[1] = INSERT_ASSET_TWO_MODE;

    //address onBehalfOf = address(this);
    //bytes-encoded parameters to be used by the receiverAddress contract
    //bytes memory params = "";
    uint16 referralCode = 0;

    // Aave V2
    /*LENDING_POOL.flashLoan(
        receiverAddress,
        assets,
        amounts,
        modes,
        onBehalfOf,
        params,
        referralCode
    );*/
    // Aave V3 is 0.05%
    //POOL.flashLoanSimple(
    IPool(address(POOL)).flashLoanSimple(
      receiverAddress, 
      assets[0], 
      amounts[0], 
      params, 
      referralCode
    );
  }

  struct Vars {
    MyCustomData msd;
    OneSwapParams osp;
    uint256 amountReceived;
    uint amountOwing;
    IERC20 inputToken;
    IERC20 outputToken;
    uint256 balanceSrcToken;
    bool success;
    bool success1;
  }
  /**
  This function is called after your contract has received the flash loaned amount
  */
  // Aave V2
  /*function executeOperation(
      address[] calldata assets,
      uint256[] calldata amounts,
      uint256[] calldata premiums,
      address initiator,
      bytes calldata params
  )   external
      override
      returns (bool)
  {*/
  function executeOperation(
      address asset,
      uint256 amount,
      uint256 premium,
      address initiator,
      bytes calldata params
  ) external override returns (bool) {
    require(initiator == address(this), "FlashBorrower: Untrusted loan initiator");
    Vars memory vars;

    // This contract now has the funds requested.
    // Your logic goes here.
    vars.msd = abi.decode(params, (MyCustomData));
    vars.osp = abi.decode(vars.msd.oneData.oneSwapParams, (OneSwapParams));

    console.log("SMART CONTRACT BALANCE (flashloan)");
    console.log("osp.fromTokenAddress       ", vars.osp.fromTokenAddress);
    console.log("balanceOf                  ", IERC20(vars.osp.fromTokenAddress).balanceOf(address(this)));
    console.log("osp.toTokenAddress         " , vars.osp.toTokenAddress);
    console.log("balanceOf                  ", IERC20(vars.osp.toTokenAddress).balanceOf(address(this)));

    vars.inputToken = IERC20(vars.osp.fromTokenAddress);
    vars.outputToken = IERC20(vars.osp.toTokenAddress);

    vars.balanceSrcToken = vars.inputToken.balanceOf(address(this));
    // Track the balance of the token RECEIVED from the trade
    //console.log("balanceSrcToken ", vars.balanceSrcToken);

    // At the end of your logic above, this contract owes
    // the flashloaned amounts + premiums.
    // Therefore ensure your contract has enough to repay
    // these amounts.

    // Paying back a flash loaned asset
    // Ensure your contract has the relevant amount + premium to payback the loaned asset. 
    // You can calculate this by taking the sum of the relevant entry in the amounts and premiums array passed 
    // into the executeOperation() function.
    // YOU DO NOT NEED TO TRANSFER THE OWED AMOUNT BACK TO THE LENDINGPOOL. 
    // THE FUNDS WILL BE AUTOMATICALLY PULLED AT THE CONCLUSION OF YOUR OPERATION.

    // Approve the Pool contract allowance to *pull* the owed amount
    // Aave V2
    /*for (uint i = 0; i < assets.length; i++) {
        vars.amountOwing = amounts[i].add(premiums[i]);
        IERC20(assets[i]).safeIncreaseAllowance(address(LENDING_POOL), vars.amountOwing);
    }*/
    // Aave V3
    vars.amountOwing = amount.add(premium);
    //vars.amountOwing = amount + premium;
    IERC20(asset).safeIncreaseAllowance(address(POOL), vars.amountOwing);

    if (vars.msd.direction == Direction.UniswapToUniswap) {
      console.log("Executing Uniswap -> Uniswap Arb opportunity...");
      vars.amountReceived = FlashloanV2Library.tradeUniswapToUniswap(params);
    }

    /*if (vars.msd.direction == Direction.OneinchToUniswap) {
      console.log("Executing 1Inch -> Uniswap Arb opportunity...");
      vars.amountReceived = FlashloanV2Library.tradeOneinchToUniswap(params);
    }

    if (vars.msd.direction == Direction.UniswapToOneinch) {
      console.log("Executing Uniswap -> 1Inch Arb opportunity...");
      vars.amountReceived = FlashloanV2Library.tradeUniswapToOneinch(params);
    }*/

    WETH = vars.msd.weth;

    //TODO comment out these lines in PROD
    console.log("WETH ", WETH);
    if (asset == WETH && amount != 0) {
      vars.success1 = IWETH(WETH).transfer(vars.msd.wallet, 1);
      require(vars.success1, "XXXX Failed to transfer ETH token profit to my MetaMask account");
      console.log("XXXX Successfully transferred", 1, "ETH token profit to sender account -", vars.success1);
    } else {
      vars.success1 = vars.outputToken.transfer(vars.msd.wallet, 1);
      require(vars.success1, "XXXX Failed to transfer OTHER token profit to my MetaMask account");
      console.log("XXXX Successfully transferred", 1, "OTHER token profit to sender account -", vars.success1);
    }
    //

    console.log("SMART CONTRACT BALANCE (swap)");
    console.log("osp.fromTokenAddress       ", vars.osp.fromTokenAddress);
    console.log("balanceOf                  ", IERC20(vars.osp.fromTokenAddress).balanceOf(address(this)));
    console.log("osp.toTokenAddress         ", vars.osp.toTokenAddress);
    console.log("balanceOf                  ", IERC20(vars.osp.toTokenAddress).balanceOf(address(this)));

    console.log("bal                        ", vars.amountReceived);
    console.log("repay                      ", vars.amountOwing);

    // Validate there is enough token balance on this contract to repay the dy/dx flashloan
    require(vars.amountReceived >= vars.amountOwing, "Not enough token balance to repay the flashloan");

    console.log("bal - repay                ", vars.amountReceived - vars.amountOwing);

    // Withdraw the profit from the flashloan and send it to an address of our own
    // Aave V2
    //if (assets[0] == WETH && amounts[0] != 0) {
    // Aave V3
    if (asset == WETH && amount != 0) {
      vars.success = IWETH(WETH).transfer(vars.msd.wallet, vars.amountReceived - vars.amountOwing);
      require(vars.success, "Failed to transfer ETH token profit to my Crypto.com wallet");
      console.log("Successfully transferred", vars.amountReceived - vars.amountOwing, "ETH token profit to my Crypto.com wallet -", vars.success);
    } else {
      vars.success = vars.outputToken.transfer(vars.msd.wallet, vars.amountReceived - vars.amountOwing);
      require(vars.success, "Failed to transfer OTHER token profit to my Crypto.com wallet");
      console.log("Successfully transferred", vars.amountReceived - vars.amountOwing, "OTHER token profit to my Crypto.com wallet -", vars.success);
    }

    // Remove spending allowance from LendingPool contract
    // Aave V2
    /*for (uint i = 0; i < assets.length; i++) {
      IERC20(assets[i]).safeDecreaseAllowance(address(LENDING_POOL), 0);
    }*/
    // Aave V3
    IERC20(asset).safeDecreaseAllowance(address(POOL), 0);

    emit Log("bal         ", vars.amountReceived);
    emit Log("repay       ", vars.amountOwing);
    emit Log("bal - repay ", vars.amountReceived - vars.amountOwing);

    emit NewArbitrage(vars.msd.direction, vars.amountReceived - vars.amountOwing, block.timestamp);

    return true;
  }
}