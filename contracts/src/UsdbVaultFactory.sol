// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IHsUSDB.sol";
import "./UsdbVault.sol";

contract UsdbVaultFactory is Ownable {
    IHsUSDB public sHsUsdb;
    uint256 public totalSupply;
    address public blastPoint;
    address public usdb;

    event VaultCreated(address indexed vault);

    constructor(address _hsUSDBAddress, address _usdb, address _blastPoint) {
        sHsUsdb = IHsUSDB(_hsUSDBAddress);
        blastPoint = _blastPoint;
        usdb = _usdb;
    }

    function createVault(address _pointOperator) public {
        UsdbVault vault = new UsdbVault(
            address(sHsUsdb),
            usdb,
            msg.sender,
            blastPoint,
            _pointOperator
        );
        bytes32 minterRole = keccak256("MINTER_ROLE");
        sHsUsdb.grantRole(minterRole, address(vault));
        totalSupply++;
        emit VaultCreated(address(vault));
    }
}
