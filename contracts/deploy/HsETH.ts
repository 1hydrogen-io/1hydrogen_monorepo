import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const hsETH = await ethers.deployContract('LiqETH')

  await hsETH.waitForDeployment()
  console.log(`hsETH with address: ${await hsETH.getAddress()}`)
  setConfig(`${network}.hsETH`, await hsETH.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
