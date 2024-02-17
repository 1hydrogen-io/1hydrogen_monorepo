import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

describe('Staking deploy', function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners()

    const LiqETH = await ethers.getContractFactory('HsETH')
    const liqETH = await LiqETH.deploy()

    const Vault = await ethers.getContractFactory('Vault')
    const vault = await Vault.deploy(await liqETH.getAddress(), deployer.address)

    await liqETH.grantRole(await liqETH.MINTER_ROLE(), await vault.getAddress())

    return {
      deployer,
      otherAccount,
      player: otherAccount,
      player2,
      liqETH,
      vault
    }
  }

  describe('Vault', function () {
    it('stake, unstake', async function () {
      const { deployer, liqETH, vault } = await loadFixture(deployFixture)
      const stakeAmount = parseEther('10')
      const mintHsEth = parseEther('7')
      const repay = parseEther('1')
      const unstake = parseEther('4')

      await (await vault.stake({ value: stakeAmount })).wait()
      expect(await liqETH.balanceOf(deployer.address)).to.be.equal(0)

      await vault.claimHsEth(mintHsEth)

      expect(await liqETH.balanceOf(deployer.address)).to.be.equal(mintHsEth)
      expect(await vault.availableBalance(deployer.address)).to.be.equal(stakeAmount - mintHsEth)

      let stakedAmount = await vault.stakedBalance(deployer.address)
      expect(stakedAmount).to.be.equal(stakeAmount)

      await expect(vault.unStake(unstake)).revertedWithCustomError(vault, 'InvalidAmount')

      await expect(vault.repayHsEth(repay)).revertedWithCustomError(vault, 'InvalidApprovalAmount')
      await liqETH.approve(await vault.getAddress(), stakeAmount)

      await vault.repayHsEth(repay)

      await vault.unStake(unstake)

      stakedAmount = await vault.stakedBalance(deployer.address)
      expect(stakedAmount).to.be.equal(stakeAmount - unstake)
      expect(await vault.availableBalance(deployer.address)).to.be.equal(
        stakeAmount - mintHsEth + repay - unstake
      )
    })
  })
})
