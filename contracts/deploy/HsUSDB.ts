import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const hsUSDB = await ethers.deployContract('HsUSDB')

  await hsUSDB.waitForDeployment()
  console.log(`hsUSDB with address: ${await hsUSDB.getAddress()}`)
  setConfig(`${network}.hsUSDB`, await hsUSDB.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
