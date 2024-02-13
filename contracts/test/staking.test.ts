import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

describe('Staking deploy', function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners()

    const LiqETH = await ethers.getContractFactory('HsETH')
    const liqETH = await LiqETH.deploy()
    liqETH.grantRole(await liqETH.MINTER_ROLE(), deployer.address)

    const Staking = await ethers.getContractFactory('Staking')
    const staking = await Staking.deploy(await liqETH.getAddress(), deployer.address)

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
    it('init package, set package', async function () {
      const { deployer, liqETH, staking } = await loadFixture(deployFixture)
      expect((await staking.getPackage()).length).to.be.equal(4)
      //
      await staking.setPackage(0, 100)

      expect((await staking.getPackage())[0]).to.be.equal(100)
    })

    it('stake, unstake', async function () {
      const { deployer, liqETH, staking, player } = await loadFixture(deployFixture)
      const stakeAmount = parseEther('2')
      await liqETH.mint(player, stakeAmount)
      await liqETH.mint(await staking.getAddress(), stakeAmount)

      for (let i = 0; i < 4; i++) {
        await expect(staking.connect(player).stake(i, stakeAmount)).revertedWith(
          'ERC20: insufficient allowance'
        )

        await liqETH.connect(player).approve(await staking.getAddress(), stakeAmount)

        const tx = await (await staking.connect(player).stake(i, stakeAmount)).wait()
        const log: any = tx?.logs[2]
        expect(log.args[1]).to.be.equal(stakeAmount)
        const stakedBalance = await staking.stakedBalance(player.address)
        expect(stakedBalance).to.be.equal(stakeAmount * BigInt(i + 1))

        expect((await staking.poolInfor())[i]).to.be.equal(stakeAmount)

        if (i > 0) {
          await expect(staking.connect(player).unStake(0)).revertedWithCustomError(
            staking,
            'InvalidReleaseDate'
          )
          // Time travel to 2 months later
          await ethers.provider.send('evm_increaseTime', [i * 30 * 24 * 60 * 60])
          await ethers.provider.send('evm_mine', [])
        }

        const unStakeTx = await (await staking.connect(player).unStake(0)).wait()
        const unStakedlog: any = unStakeTx?.logs[1]
        expect(unStakedlog.args[1]).to.be.equal(stakeAmount)
      }
    })
  })
})
