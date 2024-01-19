import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const liqETH = await ethers.deployContract('LiqETH')

  await liqETH.waitForDeployment()
  console.log(`liqETH with address: ${await liqETH.getAddress()}`)
  setConfig(`${network}.liqETH`, await liqETH.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
