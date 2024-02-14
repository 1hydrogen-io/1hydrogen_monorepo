import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const staking = await ethers.deployContract('Staking', [
    '0x55Ee887dB181B41f69b3313065b1eD6BEE3336A1'
  ])

  await staking.waitForDeployment()
  console.log(`staking with address: ${await staking.getAddress()}`)
  setConfig(`${network}.staking`, await staking.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
