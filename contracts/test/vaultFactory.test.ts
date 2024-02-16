import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { create } from 'domain'
import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

describe('Staking deploy', function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners()

    const LiqETH = await ethers.getContractFactory('LiqETH')
    const liqETH = await LiqETH.deploy()

    const VaultFactory = await ethers.getContractFactory('VaultFactory')
    const vaultFactory = await VaultFactory.deploy(await liqETH.getAddress())

    await liqETH.grantRole(await liqETH.DEFAULT_ADMIN_ROLE(), await vaultFactory.getAddress())

    return {
      deployer,
      otherAccount,
      player: otherAccount,
      player2,
      liqETH,
      vaultFactory
    }
  }

  describe('Vault factory', function () {
    it('create vault', async function () {
      const { deployer, otherAccount, vaultFactory, liqETH } = await loadFixture(deployFixture)
      const createdEvent = await (await vaultFactory.connect(otherAccount).createVault()).wait()
      const log: any = createdEvent?.logs[3]
      const vaultAddress = log.args[0]
      const stakeAmount = parseEther('2')

      const vault = await ethers.getContractAt('Vault', vaultAddress)
      await (await vault.stake({ value: stakeAmount })).wait()
      expect(await liqETH.balanceOf(deployer.address)).to.be.equal(0)

      await (await vault.claimLiqEth(stakeAmount)).wait()
      expect(await liqETH.balanceOf(deployer.address)).to.be.equal(stakeAmount)
    })
  })
})
