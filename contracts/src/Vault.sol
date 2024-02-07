// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/ILiqETH.sol";
import "./interfaces/IBlast.sol";

contract Vault is Ownable {
    ILiqETH public sLiqETH;
    address public blastYield = 0x4300000000000000000000000000000000000002;

    mapping(address => uint256) sStaker;
    mapping(address => uint256) sBalance;

    error InvalidAmount();
    error InvalidApprovalAmount();
    error InsufficientBalance();

    event Staked(address staker, uint256 amount);
    event UnStaked(address staker, uint256 amount);

    constructor(address liqETH, address owner) {
        _transferOwnership(owner);
        sLiqETH = ILiqETH(liqETH);
        //IBlast(blastYield).configureClaimableYield();
    }

    receive() external payable {}

    function stake() public payable {
        sStaker[msg.sender] += msg.value;
        sBalance[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function unStake(uint256 amount) public {
        uint256 stakedAmount = sStaker[msg.sender];

        if (amount > stakedAmount) {
            revert InvalidAmount();
        }
        uint256 approvedAmount = sLiqETH.allowance(msg.sender, address(this));
        if (approvedAmount < stakedAmount) {
            revert InvalidApprovalAmount();
        }
        uint256 liqEthBalance = sLiqETH.balanceOf(msg.sender);
        if (liqEthBalance < stakedAmount) {
            revert InsufficientBalance();
        }

        sLiqETH.burnFrom(msg.sender, amount);
        sStaker[msg.sender] -= amount;
        sBalance[msg.sender] = sBalance[msg.sender] - amount;
        payable(msg.sender).transfer(amount);

        emit UnStaked(msg.sender, stakedAmount);
    }

    function stakedBalance(address staker) public view returns (uint256 amount) {
        return sStaker[staker];
    }

    function liqBalance(address staker) public view returns (uint256 amount) {
        return sBalance[staker];
    }

    function claimLiqEth(uint256 amount) public {
        uint256 balance = sBalance[msg.sender];
        if (amount > balance) {
            revert InvalidAmount();
        }
        sBalance[msg.sender] -= amount;
        sLiqETH.mint(msg.sender, amount);
    }

    function claimYield() external onlyOwner {
        IBlast(blastYield).claimAllYield(address(this), msg.sender);
    }
}
