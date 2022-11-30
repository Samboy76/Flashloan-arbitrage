// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./IGasDiscountExtension.sol";

interface IAggregationExecutor is IGasDiscountExtension {
    //function callBytes(bytes calldata data) external payable;  // 0xd9c45357
    function callBytes(address msgSender, bytes calldata data) external payable; // 0x2636f7f8
}
