// SPDX-License-Identifier: MIT
//pragma solidity ^0.5.7;
//pragma solidity ^0.6.6;
//pragma solidity ^0.6.12;
pragma solidity ^0.8.1;
//pragma solidity ^0.8.0;
//pragma solidity >=0.6.6 <=0.8.0;
pragma experimental ABIEncoderV2;

import { Account } from "./ISoloMargin.sol";


/**
 * @title ICallee
 * @author dYdX
 *
 * Interface that Callees for Solo must implement in order to ingest data.
 */
abstract contract ICallee {

    // ============ Public Functions ============

    /**
     * Allows users to send this contract arbitrary data.
     *
     * @param  sender       The msg.sender to Solo
     * @param  accountInfo  The account from which the data is being sent
     * @param  data         Arbitrary data given by the sender
     */
    function callFunction(
        address sender,
        Account.Info memory accountInfo,
        bytes memory data
    )
        public virtual;
}