// SPDX-License-Identifier: MIT
//pragma solidity >=0.6.6;
pragma solidity >=0.5.16;

import './UniswapV2Library.sol';
import './interfaces/IUniswapV2Router02.sol';
import './interfaces/IUniswapV2Pair.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IERC20.sol';

contract FlashLoan_arbitrage {
  address immutable factory;
  uint constant deadline = 10 days;
  IUniswapV2Router02 immutable sushiRouter;

  //constructor(address _factory, address _uniRouter, address _sushiRouter) {
  constructor(address _factory, address _sushiRouter) {
    factory = _factory;  
    sushiRouter = IUniswapV2Router02(_sushiRouter);
  }

  // function for trader to call to execute an arbitrage
  // Only execute this function when the trader spots a price difference opportunity
  // between Uniswap and Sushiswap
  // Next step - build a custom script to monitor price differences
  function startArbitrage(
    address token0, // address of token to be used in the arbitrage e.g. ETH, DAI
    address token1, // 
    uint amount0, // one of these amounts will be zero 
    uint amount1  // other will be amount to borrow from our flashloan
  ) external {
    address pairAddress;
    //require(numPairs > 0, 'No addresses avail in pool');

    // retrieve the address of pairsmap contract of Uniswap 
    // for these two tokens
    pairAddress = IUniswapV2Factory(factory).getPair(token0, token1);
    
    //if(pairAddress == address(0)) {
      //   pairAddress = IUniswapV2Factory(factory).createPair(token0, token1);
      //}

    // Uniswap ecosystem - pairsmap of contract is liquidity pool of 
    // Uniswap which is where the trade actually happens
    // Return error if combination does not exist
    //if (token0 == WETH) {
      //pairAddress = IUniswapV2Factory(factory).getPair(
      //WETH,
      //token0);
    //}
    require(pairAddress != address(0), 'This pool does not exist');

    // swap function initiate the flashloan
    // create a pointer to pairsmap contract of the 2 tokens
    IUniswapV2Pair(pairAddress).swap(
      amount0,            // one of these amounts is zero
      amount1,            // non-zero is amount to borrow
      address(this),      // address to receive the borrowed token
      bytes('not empty')  // used to trigger the flashloan
    );
  }

  // Uniswap is expecting smart contract to have this function
  //function uniswapV2Call(address _sender, uint _amount0, uint _amount1, bytes calldata _data) external {
  function uniswapV2Call(address _sender, uint _amount0, uint _amount1) external {
      // addresses for performing the trade
      address[] memory path = new address[](2);
      // get amount borrowed
      uint amountToken = _amount0 == 0 ? _amount1 : _amount0;
      // addresses of liquidity pool
      address token0 = IUniswapV2Pair(msg.sender).token0();
      address token1 = IUniswapV2Pair(msg.sender).token1();
      // call comes from one of the pair contract of Uniswap
      // do not want all smart contracts to mess with our 
      // arbitrage smart contract and do weird things!
      require(msg.sender == UniswapV2Library.pairFor(factory, token0, token1), "Unauthorized");
      //require(_sender == address(this), "!sender");
      // ensure one of the amounts equals to zero
      require(_amount0 == 0 || _amount1 == 0);
      // important to define the direction of our trade:-
      //    if amt is zero, sell token1 for token0 in sushiswap
      //    if amt is zero, sell token0 for token1
      path[0] = _amount0 == 0 ? token1 : token0;
      path[1] = _amount0 == 0 ? token0 : token1;
      // build a pointer to the token we´re going to sell on Sushiswap
      IERC20 token = IERC20(_amount0 == 0 ? token1 : token0);
      // allow the router of Sushiswap to spend our tokens
      // necessary for trading on Sushiswap
      token.approve(address(sushiRouter), amountToken);

      // no need for require() check, if amount required is not sent sushiRouter will revert
      // calcuate the amt of tokens we need to reimburse to the flashloan of Uniswap
      uint amountRequired = UniswapV2Library.getAmountsIn(factory, amountToken, path)[0];
      // sell tokens we borrowed from Uniswap that we need to sell on Sushiswap
      uint amountReceived = sushiRouter.swapExactTokensForTokens(amountToken, amountRequired, path, msg.sender, deadline)[1];

      // get a pointer to the other token we got as output of Sushiswap,
      IERC20 otherToken = IERC20(_amount0 == 0 ? token0 : token1);
      // a portion of this token used to reimburse the Uniswap flashloan
      otherToken.transfer(msg.sender, amountRequired);

      // YEAHH PROFIT
      token.transfer(_sender, amountReceived - amountRequired);
  }
}
