import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const staking = await ethers.deployContract('UsdbStaking', [
    '0xCA0AaF48356d44f254333C4F2C8Fc3295D00F602' //hsusdb
  ])

  await staking.waitForDeployment()
  console.log(`staking with address: ${await staking.getAddress()}`)
  setConfig(`${network}.usdbStaking`, await staking.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
