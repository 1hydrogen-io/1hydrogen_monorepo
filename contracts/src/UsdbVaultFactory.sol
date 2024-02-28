// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IHsUSDB.sol";
import "./UsdbVault.sol";

contract UsdbVaultFactory is Ownable {
    IHsUSDB public sHsUsdb;
    uint256 public totalSupply;

    event VaultCreated(address indexed vault);

    constructor(address _hsUSDBAddress) {
        sHsUsdb = IHsUSDB(_hsUSDBAddress);
    }

    function createVault(address _usdb) public {
        UsdbVault vault = new UsdbVault(address(sHsUsdb), _usdb, msg.sender);
        bytes32 minterRole = keccak256("MINTER_ROLE");
        sHsUsdb.grantRole(minterRole, address(vault));
        totalSupply++;
        emit VaultCreated(address(vault));
    }
}
