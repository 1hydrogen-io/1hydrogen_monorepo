// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ILiqETH.sol";
import "./interfaces/IBlast.sol";

contract Staking is Ownable {
    ILiqETH public sLiqETH;
    address public blastYield = 0x4300000000000000000000000000000000000002;
    struct StakerInfor {
        uint256 amount;
        uint256 startTime;
        uint256 releaseTime;
        bool isReleased;
    }

    mapping(address => StakerInfor[]) sStaker;

    error InvalidStake();
    error InvalidApprovalAmount();
    error InvalidStakedIndex();

    event Staked(address staker, uint256 amount);
    event UnStaked(address staker, uint256 amount);

    constructor(address liqETH) {
        sLiqETH = ILiqETH(liqETH);
        IBlast(blastYield).configureClaimableYield();
    }

    receive() external payable {}

    function stake() public payable {
        StakerInfor memory infor = StakerInfor(msg.value, block.timestamp, 0, false);
        sStaker[msg.sender].push(infor);
        sLiqETH.mint(msg.sender, msg.value);
        emit Staked(msg.sender, msg.value);
    }

    function unStake(uint256 index) public {
        if (index > sStaker[msg.sender].length - 1) revert InvalidStakedIndex();
        StakerInfor storage stakeInfor = sStaker[msg.sender][index];
        if (stakeInfor.isReleased == true) {
            revert InvalidStake();
        }
        uint256 stakedAmount = stakeInfor.amount;
        uint256 approvedAmount = sLiqETH.allowance(msg.sender, address(this));
        if (approvedAmount < stakedAmount) {
            revert InvalidApprovalAmount();
        }
        sLiqETH.transferFrom(msg.sender, address(this), stakedAmount);

        stakeInfor.isReleased = true;
        stakeInfor.releaseTime = block.timestamp;
        payable(msg.sender).transfer(stakedAmount);

        emit UnStaked(msg.sender, stakedAmount);
    }

    function stakedPackage(address staker) public view returns (uint256) {
        return sStaker[staker].length;
    }

    function stakedInfo(address staker) public view returns (StakerInfor[] memory) {
        return sStaker[staker];
    }

    function stakedInfoByIndex(
        address staker,
        uint256 index
    ) public view returns (StakerInfor memory) {
        return sStaker[staker][index];
    }

    function claimYield() external onlyOwner {
        IBlast(blastYield).claimAllYield(address(0), msg.sender);
    }
}
