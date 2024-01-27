import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const vaultFactory = await ethers.deployContract('VaultFactory', [
    '0x55Ee887dB181B41f69b3313065b1eD6BEE3336A1'
  ])

  await vaultFactory.waitForDeployment()
  console.log(`vaultFactory with address: ${await vaultFactory.getAddress()}`)
  setConfig(`${network}.vaultFactory`, await vaultFactory.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
