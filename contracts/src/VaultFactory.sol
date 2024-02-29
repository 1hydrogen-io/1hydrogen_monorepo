// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IHsETH.sol";
import "./interfaces/IBlast.sol";
import "./Vault.sol";
import "./interfaces/IBlastPoints.sol";

contract VaultFactory is Ownable {
    IHsETH public sLiqETH;
    uint256 public totalSupply;
    address public blastYield;
    address public blastPoint;

    event VaultCreated(address indexed vault);

    constructor(
        address _liqETHAddress,
        address _yield,
        address _blastPoint,
        address _pointOperator
    ) {
        sLiqETH = IHsETH(_liqETHAddress);
        blastYield = _yield;
        blastPoint = _blastPoint;
        IBlastPoints(blastPoint).configurePointsOperator(_pointOperator);
    }

    function createVault(address _pointOperator) public {
        Vault vault = new Vault(
            address(sLiqETH),
            msg.sender,
            blastYield,
            blastPoint,
            _pointOperator
        );
        bytes32 minterRole = keccak256("MINTER_ROLE");
        sLiqETH.grantRole(minterRole, address(vault));
        totalSupply++;
        emit VaultCreated(address(vault));
    }
}
