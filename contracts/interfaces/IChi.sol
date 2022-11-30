// SPDX-License-Identifier: MIT
//pragma solidity ^0.6.6;
//pragma solidity ^0.6.12;
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


interface IChi is IERC20 {
    function mint(uint256 value) external;

    function free(uint256 value) external returns (uint256 freed);

    function freeFromUpTo(address from, uint256 value)
        external
        returns (uint256 freed);
}