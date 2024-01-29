import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

describe('Staking deploy', function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners()

    const LiqETH = await ethers.getContractFactory('LiqETH')
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

  describe('Staking', function () {
    it('stake, unstake', async function () {
      const { deployer, liqETH, vault } = await loadFixture(deployFixture)
      const stakeAmount = parseEther('2')
      await (await vault.stake({ value: stakeAmount })).wait()
      expect(await liqETH.balanceOf(deployer.address)).to.be.equal(0)

      await expect(vault.unStake(parseEther('3'))).revertedWithCustomError(vault, 'InvalidAmount')

      let stakedAmount = await vault.stakedBalance(deployer.address)

      expect(stakedAmount).to.be.equal(stakeAmount)

      await expect(vault.unStake(0)).revertedWithCustomError(vault, 'InvalidApprovalAmount')

      await liqETH.approve(await vault.getAddress(), stakeAmount)

      await expect(vault.unStake(0)).revertedWithCustomError(vault, 'InsufficientBalance')

      await vault.withdraw(stakeAmount)

      await (await vault.unStake(0)).wait()

      stakedAmount = await vault.stakedBalance(deployer.address)
    })
  })
})
