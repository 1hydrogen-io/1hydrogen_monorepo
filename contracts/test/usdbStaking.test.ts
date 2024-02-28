import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

describe('Staking deploy', function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners()

    const HsUsdb = await ethers.getContractFactory('HsUSDB')
    const hsUsdb = await HsUsdb.deploy()
    hsUsdb.grantRole(await hsUsdb.MINTER_ROLE(), deployer.address)

    const Staking = await ethers.getContractFactory('UsdbStaking')
    const staking = await Staking.deploy(await hsUsdb.getAddress())

    return {
      deployer,
      otherAccount,
      player: otherAccount,
      player2,
      hsUsdb,
      staking
    }
  }

  describe('Staking', function () {
    it('init package, set package', async function () {
      const { staking } = await loadFixture(deployFixture)
      expect((await staking.getPackage()).length).to.be.equal(4)
      //
      await staking.setPackage(0, 100)

      expect((await staking.getPackage())[0]).to.be.equal(100)
    })

    it('stake, unstake', async function () {
      const { deployer, hsUsdb, staking, player } = await loadFixture(deployFixture)
      const stakeAmount = parseEther('2')
      await hsUsdb.mint(player, stakeAmount * BigInt(4))
      await hsUsdb.mint(await staking.getAddress(), stakeAmount)

      for (let i = 0; i < 4; i++) {
        await expect(staking.connect(player).stake(i, stakeAmount)).revertedWith(
          'ERC20: insufficient allowance'
        )

        await hsUsdb.connect(player).approve(await staking.getAddress(), stakeAmount)
        const tx = await (await staking.connect(player).stake(i, stakeAmount)).wait()
        const log: any = tx?.logs[2]
        expect(log.args[1]).to.be.equal(stakeAmount)
        const stakedBalance = await staking.stakedBalance(player.address)

        expect(stakedBalance).to.be.equal(stakeAmount)

        expect((await staking.poolInfor())[i]).to.be.equal(stakeAmount)

        if (i > 0) {
          await expect(staking.connect(player).unStake(0)).revertedWithCustomError(
            staking,
            'InvalidReleaseDate'
          )
          // Time travel to 2 months later
          await ethers.provider.send('evm_increaseTime', [i * 3 * 30 * 24 * 60 * 60])
          await ethers.provider.send('evm_mine', [])
        }

        const unStakeTx = await (await staking.connect(player).unStake(0)).wait()
        const unStakedlog: any = unStakeTx?.logs[1]
        expect(unStakedlog.args[1]).to.be.equal(stakeAmount)
      }
    })
  })
})
