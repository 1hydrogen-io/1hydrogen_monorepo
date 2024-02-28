// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

import "./interfaces/IHsUSDB.sol";
import "./interfaces/IERC20Rebasing.sol";

contract UsdbVault is Ownable {
    IHsUSDB public sHsUSDB;
    IERC20Rebasing public USDB;

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
    event HsUSDBRepaid(address staker, uint256 amount);

    constructor(address hsUSDB, address usdb, address owner) {
        _transferOwnership(owner);
        sHsUSDB = IHsUSDB(hsUSDB);
        USDB = IERC20Rebasing(usdb);
        USDB.configure(YieldMode.CLAIMABLE);
    }

    receive() external payable {}

    function setFee(uint256 newFee) public onlyOwner {
        if (sFee < MIN_FEE && sFee > MAX_FEE) revert InvalidFee();
        sFee = newFee;
    }

    function stake(uint256 amount) public {
        uint256 balance = USDB.balanceOf(msg.sender);
        if (balance < amount) revert InsufficientBalance();
        SafeERC20.safeTransferFrom(USDB, msg.sender, address(this), amount);
        sStaker[msg.sender] += amount;
        sBalance[msg.sender] += amount;
        sTotalStaked += amount;
        emit Staked(msg.sender, amount);
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
        USDB.transfer(msg.sender, amount);
        emit UnStaked(msg.sender, amount);
    }

    function repayHsUsdb(uint256 amount) public {
        uint256 amountLeft = sStaker[msg.sender] - sBalance[msg.sender];
        if (amount > amountLeft) {
            revert InvalidAmount();
        }
        uint256 approvedAmount = sHsUSDB.allowance(msg.sender, address(this));
        if (approvedAmount < amount) {
            revert InvalidApprovalAmount();
        }
        uint256 hsUsdbBalance = sHsUSDB.balanceOf(msg.sender);
        if (hsUsdbBalance < amount) {
            revert InsufficientBalance();
        }

        sHsUSDB.burnFrom(msg.sender, amount);
        uint256 amountWithFee = amount - ((amount * sFee) / 100);
        sBalance[msg.sender] = sBalance[msg.sender] + amountWithFee;
        emit HsUSDBRepaid(msg.sender, amount);
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

    function claimHsUSDB(uint256 amount) public {
        uint256 balance = sBalance[msg.sender];
        if (amount > balance) {
            revert InvalidAmount();
        }
        sBalance[msg.sender] -= amount;
        sHsUSDB.mint(msg.sender, amount);
    }

    function claimYield() external onlyOwner {
        USDB.claim(msg.sender, USDB.getClaimableAmount(address(this)));
    }
}
