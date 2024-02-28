// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IERC20Rebasing.sol";

contract Usdb is ERC20, ERC20Burnable, AccessControl, IERC20Rebasing {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("Usdb", "Usdb") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function configure(YieldMode) external override returns (uint256) {}

    function claim(address recipient, uint256 amount) external override returns (uint256) {}

    function getClaimableAmount(address account) external view override returns (uint256) {}
}
