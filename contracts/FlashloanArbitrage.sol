// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IUniswapV2Callee.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IUniswapV2Router02.sol";
//import "@uniswap/v2-periphery/contracts/interfaces/IWETH.sol";
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';
import "./interfaces/IERC20.sol";
import "./UniswapV2Library.sol";

contract FlashloanArbitrage {
  //address immutable factory;
  //IUniswapV2Router02 immutable router;
  address factory;
  IUniswapV2Router02 router;
  uint constant deadline = 10 days;
  
  event Log(string message, uint val);

  function noname () public payable { }

  constructor(address _factory, address _router) {
    factory = _factory;  
    router = IUniswapV2Router02(_router);
  }

  function startArbitrage(
    address account, // MetaMask account to receive the profit tokens
    address token0, // address of token to be used in the arbitrage e.g. WETH
    address token1, // e.g. 1INCH
    uint amount0, // one of these amounts will be zero 
    uint amount1  // other will be amount to borrow from our flashloan e.g. X 1INCH
  ) external {
    address pairAddress;
    pairAddress = IUniswapV2Factory(factory).getPair(token0, token1);
    
    require(pairAddress != address(0), 'This pool does not exist');

    // need to pass some data to trigger uniswapV2Call
    bytes memory data = abi.encode(account, factory, router);
    //bytes memory data = abi.encode(shouldStartEth, factory, router, token0, amount0, token1, amount1);
    
    IUniswapV2Pair(pairAddress).swap(
      amount0,            // one of these amounts is zero
      amount1,            // non-zero is amount to borrow
      address(this),      // address to receive the borrowed token
      data                // used to trigger the flashloan
    );
    emit Log("flashloan created @", block.timestamp);
  }

  // Uniswap is expecting smart contract to have this function
  function uniswapV2Call(
    address _sender,
    uint _amount0,
    uint _amount1,
    bytes calldata _data) external {
      // addresses for performing the trade
      address[] memory path = new address[](2);
      // get amount borrowed
      uint amountToken = _amount0 == 0 ? _amount1 : _amount0;
      
      // addresses of liquidity pool
      address token0 = IUniswapV2Pair(msg.sender).token0();
      address token1 = IUniswapV2Pair(msg.sender).token1();

      require(msg.sender == UniswapV2Library.pairFor(factory, token0, token1), "Unauthorized, !pair");
      require(_sender == address(this), "!sender");
      
      // ensure one of the amounts equals to zero
      require(_amount0 == 0 || _amount1 == 0);
      // important to define the direction of our trade -
      path[0] = _amount0 == 0 ? token1 : token0;
      path[1] = _amount0 == 0 ? token0 : token1;
      // build a pointer to the token we´re going to sell on Sushiswap
      IERC20 token = IERC20(_amount0 == 0 ? token1 : token0);

      (address _account, address _factory, IUniswapV2Router02 _router) = 
      abi.decode(_data, (address, address, IUniswapV2Router02));
      
      // allow the router to spend our tokens necessary for trading
      // on higher priced pool
      token.approve(address(_router), amountToken);
      
      // no need for require() check, if amount required is not sent Router will revert
      // calcuate the amt of tokens we need to reimburse to flashloan provider
      uint amountRequired = UniswapV2Library.getAmountsIn(_factory, amountToken, path)[0];
     
      // apply %increased slippage tolerance on calculated amountRequired 
      // to avoid trade transaction from falling through (INSUFFICIENT_OUTPUT_AMOUNT)
      // amountRequired = (amountRequired / 100) * 95;
      uint amountReceived = _router.swapExactTokensForTokens(amountToken, amountRequired, path, msg.sender, block.timestamp + 120)[1];

      // get a pointer to the other token we got as output of Uni/Sushiswap
      IERC20 otherToken = IERC20(_amount0 == 0 ? token0 : token1);
      // a portion of this token used to reimburse the Uniswap flashloan
      otherToken.transfer(msg.sender, amountRequired);
      
      // YEAHH PROFIT
      //token.transfer(address(this), amountReceived - amountRequired);
      //token.transfer(_sender, amountReceived - amountRequired);
      token.transfer(_account, amountReceived - amountRequired);
      //need to transfer to my MetaMask account instead of smart contract address
      
      // do stuff here
      emit Log("trade _amount0: ", _amount0);
      emit Log("trade _amount1: ", _amount1);
      emit Log("amount received: ", amountReceived);
      emit Log("amount required to repay: ", amountRequired);
      emit Log("amount profit: ", amountReceived - amountRequired);
  }
}
