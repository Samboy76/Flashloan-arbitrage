// SPDX-License-Identifier: GPL-2.0-or-later
//pragma solidity =0.7.6;
//pragma solidity 0.6.12;
pragma solidity 0.8.10;

import '@uniswap/v3-periphery/contracts/interfaces/IPeripheryImmutableState.sol';

/// @title Immutable state
/// @notice Immutable state used by periphery contracts
abstract contract PeripheryImmutableState is IPeripheryImmutableState {
    /// @inheritdoc IPeripheryImmutableState
    address public immutable override factory;
    /// @inheritdoc IPeripheryImmutableState
    address public immutable override WETH9;

    constructor(address _factory, address _WETH9) {
        factory = _factory;
        WETH9 = _WETH9;
    }
}
