import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

describe('Staking deploy', function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners()

    const USDB = await ethers.getContractFactory('Usdb')
    const usdb = await USDB.deploy()
    usdb.grantRole(await usdb.MINTER_ROLE(), deployer.address)

    const HsUSDB = await ethers.getContractFactory('HsUSDB')
    const hsUSDB = await HsUSDB.deploy()

    const Vault = await ethers.getContractFactory('UsdbVault')
    const vault = await Vault.deploy(
      await hsUSDB.getAddress(),
      await usdb.getAddress(),
      deployer.address
    )

    await hsUSDB.grantRole(await hsUSDB.MINTER_ROLE(), await vault.getAddress())

    return {
      deployer,
      otherAccount,
      player: otherAccount,
      player2,
      hsUSDB,
      usdb,
      vault
    }
  }

  describe('Vault', function () {
    it('stake, unstake', async function () {
      const { deployer, hsUSDB, vault, usdb } = await loadFixture(deployFixture)
      const stakeAmount = parseEther('10')
      const mintHsEth = parseEther('7')
      const repay = parseEther('1')
      const unstake = parseEther('4')

      await expect(vault.stake(stakeAmount)).revertedWithCustomError(vault, 'InsufficientBalance')

      await usdb.mint(deployer.address, stakeAmount)

      await expect(vault.stake(stakeAmount)).to.be.rejectedWith('ERC20: insufficient allowance')

      await usdb.approve(await vault.getAddress(), stakeAmount)

      await (await vault.stake(stakeAmount)).wait()
      expect(await hsUSDB.balanceOf(deployer.address)).to.be.equal(0)

      await vault.claimHsUSDB(mintHsEth)

      expect(await hsUSDB.balanceOf(deployer.address)).to.be.equal(mintHsEth)
      expect(await vault.availableBalance(deployer.address)).to.be.equal(stakeAmount - mintHsEth)

      let stakedAmount = await vault.stakedBalance(deployer.address)
      expect(stakedAmount).to.be.equal(stakeAmount)

      await expect(vault.unStake(unstake)).revertedWithCustomError(vault, 'InvalidAmount')

      await expect(vault.repayHsUsdb(repay)).revertedWithCustomError(vault, 'InvalidApprovalAmount')
      await hsUSDB.approve(await vault.getAddress(), stakeAmount)

      await vault.repayHsUsdb(repay)

      await vault.unStake(unstake)

      stakedAmount = await vault.stakedBalance(deployer.address)
      expect(stakedAmount).to.be.equal(stakeAmount - unstake)
      expect(await vault.availableBalance(deployer.address)).to.be.equal(
        stakeAmount - mintHsEth + repay - unstake
      )
    })
  })
})
