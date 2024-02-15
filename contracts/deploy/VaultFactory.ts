import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const vaultFactory = await ethers.deployContract('VaultFactory', [
    '0x7C84156e5f873dB9f544459cb4aA6eC5fc45f67a'
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
