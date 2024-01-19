// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/interfaces/IERC20.sol";

interface ILiqETH is IERC20 {
    function mint(address to, uint256 amount) external;
}
