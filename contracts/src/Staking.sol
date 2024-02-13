// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./interfaces/IHsETH.sol";

contract Staking is Ownable {
    uint256 private constant MAX_INDEX = 999;
    uint256 private constant BASE_RATIO = 10000;
    IHsETH public sHsETH;

    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 releaseDate;
        uint256 rewardDebt;
        uint256 package;
    }

    mapping(address => StakeInfo[]) sStaker;
    mapping(address => uint256) sStakedBalance; //total staked amount of wallet
    mapping(address => uint256) sUnStakedBalance; //total staked amount of wallet

    uint256[] sPackage; //stake package and APR rate. base ratio is 10,000. ex: 100 = 1%
    uint256[4] sStakedPool; // store pool value

    error InvalidAmount();
    error InvalidApprovalAmount();
    error InsufficientBalance();
    error InvalidReleaseDate();
    error InvalidIndex();

    event Staked(address staker, uint256 amount);
    event UnStaked(address staker, uint256 amount);

    constructor(address hsETH, address owner) {
        _transferOwnership(owner);
        sHsETH = IHsETH(hsETH);
        initPackage();
    }

    receive() external payable {}

    function initPackage() internal {
        sPackage.push(281); //2.81% no lock
        sPackage.push(731); //7.31% 1m
        sPackage.push(843); //8.43% 3m
        sPackage.push(1125); //11.25% 6m
    }

    function getPackage() public view returns (uint256[] memory) {
        return sPackage;
    }

    function setPackage(uint256 package, uint256 apr) public onlyOwner {
        sPackage[package] = apr;
    }

    function getTerm(uint256 package) public pure returns (uint256) {
        if (package == 1) {
            return 30;
        } else if (package == 2) {
            return 60;
        } else if (package == 3) {
            return 90;
        } else return 0;
    }

    function stake(uint256 package, uint256 amount) public {
        uint256 balance = sHsETH.balanceOf(msg.sender);
        if (balance < amount) revert InsufficientBalance();
        SafeERC20.safeTransferFrom(sHsETH, msg.sender, address(this), amount);
        uint256 term = getTerm(package);
        uint256 startTime = block.timestamp;
        uint256 releaseDate = term > 0 ? startTime + term * 1 days : 0;
        uint256 reward = term > 0 ? (sPackage[package] * amount * term) / BASE_RATIO / 365 : 0;
        StakeInfo memory stakeInfor = StakeInfo(amount, startTime, releaseDate, reward, package);
        sStaker[msg.sender].push(stakeInfor);
        sStakedBalance[msg.sender] += amount;
        sStakedPool[package] += amount;
        emit Staked(msg.sender, amount);
    }

    function unStake(uint256 index) public {
        StakeInfo[] storage stakeInfors = sStaker[msg.sender];
        if (index > stakeInfors.length - 1) {
            revert InvalidIndex();
        }
        StakeInfo memory stakeInfo = stakeInfors[index];
        if (stakeInfo.releaseDate > block.timestamp) {
            revert InvalidReleaseDate();
        }
        uint256 reward = stakeInfo.rewardDebt;
        if (stakeInfo.package == 0) {
            reward =
                (((block.timestamp - stakeInfo.startTime) / 1 days) *
                    sPackage[0] *
                    stakeInfo.amount) /
                BASE_RATIO /
                365;
        }
        uint256 unStakeAmount = stakeInfo.amount + reward;
        if (sHsETH.balanceOf(address(this)) < unStakeAmount) {
            revert InsufficientBalance();
        }

        stakeInfors[index] = stakeInfors[stakeInfors.length - 1];
        stakeInfors.pop();
        sStakedPool[stakeInfo.package] -= stakeInfo.amount;

        SafeERC20.safeTransfer(sHsETH, msg.sender, unStakeAmount);

        emit UnStaked(msg.sender, stakeInfo.amount);
    }

    function stakedBalance(address staker) public view returns (uint256 amount) {
        return sStakedBalance[staker];
    }

    function unStakedBalance(address staker) public view returns (uint256 amount) {
        return sUnStakedBalance[staker];
    }

    function poolInfor() public view returns (uint256[4] memory) {
        return sStakedPool;
    }
}
