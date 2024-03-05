import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  // blast yield testnet: 0x4300000000000000000000000000000000000002
  // blast yield mainnet: 0x4300000000000000000000000000000000000002
  // blast point testnet: 0x2fc95838c71e76ec69ff817983BFf17c710F34E0
  // blast point mainnet: 0x2536FE9ab3F511540F2f9e2eC2A805005C3Dd800
  const vaultFactory = await ethers.deployContract('VaultFactory', [
    '0x7C84156e5f873dB9f544459cb4aA6eC5fc45f67a', // hsETh
    '0x4300000000000000000000000000000000000002', //yield address
    '0x2fc95838c71e76ec69ff817983BFf17c710F34E0', //blast point address
    process.env.ADDRESS //point operation for factory
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
