// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IHsETH.sol";
import "./interfaces/IBlast.sol";
import "./Vault.sol";

contract VaultFactory is Ownable {
    IHsETH public sLiqETH;
    uint256 public totalSupply;

    event VaultCreated(address indexed vault);

    constructor(address _liqETHAddress) {
        sLiqETH = IHsETH(_liqETHAddress);
    }

    function createVault() public {
        Vault vault = new Vault(address(sLiqETH), msg.sender);
        bytes32 minterRole = keccak256("MINTER_ROLE");
        sLiqETH.grantRole(minterRole, address(vault));
        totalSupply++;
        emit VaultCreated(address(vault));
    }
}
