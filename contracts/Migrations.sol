// SPDX-License-Identifier: MIT
//pragma solidity ^0.8.1;
//pragma solidity 0.6.12;
//pragma solidity 0.7.0;
//pragma solidity >=0.6.12 <=0.7.6;
pragma solidity 0.8.10;


contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}