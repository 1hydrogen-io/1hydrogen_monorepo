// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IHsETH.sol";
import "./interfaces/IBlast.sol";

contract Vault is Ownable {
    IHsETH public sHsETH;
    address public blastYield = 0x4300000000000000000000000000000000000002;
    uint256 public constant MIN_FEE = 0; //0%
    uint256 public constant MAX_FEE = 2; //2%
    uint256 public sFee;
    uint256 public sTotalStaked;
    uint256 public sTotalUnStaked;

    mapping(address => uint256) sStaker;
    mapping(address => uint256) sBalance;
    mapping(address => uint256) sUnStaked;

    error InvalidAmount();
    error InvalidApprovalAmount();
    error InsufficientBalance();
    error InvalidFee();

    event Staked(address staker, uint256 amount);
    event UnStaked(address staker, uint256 amount);
    event HsETHRepaid(address staker, uint256 amount);

    constructor(address hsETH, address owner) {
        _transferOwnership(owner);
        sHsETH = IHsETH(hsETH);
        IBlast(blastYield).configureClaimableYield();
    }

    receive() external payable {}

    function setFee(uint256 newFee) public onlyOwner {
        if (sFee < MIN_FEE && sFee > MAX_FEE) revert InvalidFee();
        sFee = newFee;
    }

    function stake() public payable {
        sStaker[msg.sender] += msg.value;
        sBalance[msg.sender] += msg.value;
        sTotalStaked += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function unStake(uint256 amount) public {
        uint256 availableAmount = sBalance[msg.sender];

        if (amount > availableAmount) {
            revert InvalidAmount();
        }
        sStaker[msg.sender] -= amount;
        sUnStaked[msg.sender] += amount;
        sBalance[msg.sender] = availableAmount - amount;
        sTotalStaked -= amount;
        sTotalUnStaked += amount;
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
        uint256 amountWithFee = amount - ((amount * sFee) / 100);
        sBalance[msg.sender] = sBalance[msg.sender] + amountWithFee;
        emit HsETHRepaid(msg.sender, amount);
    }

    function stakedBalance(address staker) public view returns (uint256 amount) {
        return sStaker[staker];
    }

    function unStakedBalance(address staker) public view returns (uint256 amount) {
        return sUnStaked[staker];
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
