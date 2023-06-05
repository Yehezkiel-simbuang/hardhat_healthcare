// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Healthcare {
    address private immutable doctor;

    mapping(address => string[]) private storedHash;

    error YouAreNotADoctor();

    modifier onlyDoctor() {
        if (msg.sender == doctor) {
            _;
        } else {
            revert YouAreNotADoctor();
        }
    }

    constructor() {
        doctor = msg.sender;
    }

    //store hash file
    function storeHash(string memory fileHash) public onlyDoctor {
        storedHash[msg.sender].push(fileHash);
    }

    //verify hash file
    function verifyHash(string memory fileHash) public view returns (bool) {
        string[] memory array0fFileHash = storedHash[doctor];
        for (uint i = 0; i < array0fFileHash.length; i++) {
            if (
                keccak256(bytes(array0fFileHash[i])) ==
                keccak256(bytes(fileHash))
            ) {
                return true;
            }
        }
        return false;
    }
}
