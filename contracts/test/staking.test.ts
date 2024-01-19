import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

describe('Staking deploy', function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners()

    const LiqETH = await ethers.getContractFactory('LiqETH')
    const liqETH = await LiqETH.deploy()

    const Staking = await ethers.getContractFactory('Staking')
    const staking = await Staking.deploy(await liqETH.getAddress())

    await liqETH.grantRole(await liqETH.MINTER_ROLE(), await staking.getAddress())

    return {
      deployer,
      otherAccount,
      player: otherAccount,
      player2,
      liqETH,
      staking
    }
  }

  describe('Staking', function () {
    it('stake, unstake', async function () {
      const { deployer, player, player2, liqETH, staking } = await loadFixture(deployFixture)
      const stakeAmount = parseEther('2')
      await (await staking.stake({ value: stakeAmount })).wait()
      expect(await staking.stakedPackage(deployer.address)).to.be.equal(1)
      expect(await liqETH.balanceOf(deployer.address)).to.be.equal(stakeAmount)

      await expect(staking.unStake(1)).revertedWithCustomError(staking, 'InvalidStakedIndex')

      const stakeInforBefore = await staking.stakedInfoByIndex(deployer.address, 0)

      expect(stakeInforBefore.amount).to.be.equal(stakeAmount)
      expect(stakeInforBefore.isReleased).to.be.equal(false)

      await expect(staking.unStake(0)).revertedWithCustomError(staking, 'InvalidApprovalAmount')

      await liqETH.approve(await staking.getAddress(), stakeAmount)

      await (await staking.unStake(0)).wait()

      const stakeInforAfter = await staking.stakedInfoByIndex(deployer.address, 0)
      expect(stakeInforAfter.isReleased).to.be.equal(true)

      //unstake twice
      await expect(staking.unStake(0)).revertedWithCustomError(staking, 'InvalidStake')
    })
  })
})
