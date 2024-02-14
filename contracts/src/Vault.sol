// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IHsETH.sol";
import "./interfaces/IBlast.sol";

contract Vault is Ownable {
    IHsETH public sHsETH;
    address public blastYield = 0x4300000000000000000000000000000000000002;

    mapping(address => uint256) sStaker;
    mapping(address => uint256) sBalance;

    error InvalidAmount();
    error InvalidApprovalAmount();
    error InsufficientBalance();

    event Staked(address staker, uint256 amount);
    event UnStaked(address staker, uint256 amount);
    event HsETHRepaid(address staker, uint256 amount);

    constructor(address hsETH, address owner) {
        _transferOwnership(owner);
        sHsETH = IHsETH(hsETH);
        //IBlast(blastYield).configureClaimableYield();
    }

    receive() external payable {}

    function stake() public payable {
        sStaker[msg.sender] += msg.value;
        sBalance[msg.sender] += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function unStake(uint256 amount) public {
        uint256 availableAmount = sBalance[msg.sender];

        if (amount > availableAmount) {
            revert InvalidAmount();
        }
        sStaker[msg.sender] -= amount;
        sBalance[msg.sender] = sBalance[msg.sender] - amount;
        payable(msg.sender).transfer(amount);
        emit UnStaked(msg.sender, amount);
    }

    function repayHsEth(uint256 amount) public {
        uint256 amountLeft = sStaker[msg.sender] - sBalance[msg.sender];

        if (amount > amountLeft) {
            revert InvalidAmount();
        }
        uint256 approvedAmount = sHsETH.allowance(msg.sender, address(this));
        if (approvedAmount < amount) {
            revert InvalidApprovalAmount();
        }
        uint256 liqEthBalance = sHsETH.balanceOf(msg.sender);
        if (liqEthBalance < amount) {
            revert InsufficientBalance();
        }

        sHsETH.burnFrom(msg.sender, amount);
        sBalance[msg.sender] = sBalance[msg.sender] + amount;
        payable(msg.sender).transfer(amount);

        emit HsETHRepaid(msg.sender, amount);
    }

    function stakedBalance(address staker) public view returns (uint256 amount) {
        return sStaker[staker];
    }

    function availableBalance(address staker) public view returns (uint256 amount) {
        return sBalance[staker];
    }

    function claimHsEth(uint256 amount) public {
        uint256 balance = sBalance[msg.sender];
        if (amount > balance) {
            revert InvalidAmount();
        }
        sBalance[msg.sender] -= amount;
        sHsETH.mint(msg.sender, amount);
    }

    function claimYield() external onlyOwner {
        IBlast(blastYield).claimAllYield(address(this), msg.sender);
    }
}
