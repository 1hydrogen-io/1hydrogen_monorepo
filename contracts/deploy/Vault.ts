import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  // blast yield testnet: 0x4300000000000000000000000000000000000002
  // blast point testnet: 0x2fc95838c71e76ec69ff817983BFf17c710F34E0
  const vault = await ethers.deployContract('Vault', [
    '0x7C84156e5f873dB9f544459cb4aA6eC5fc45f67a',
    process.env.ADDRESS,
    '0x4300000000000000000000000000000000000002',
    '0x2fc95838c71e76ec69ff817983BFf17c710F34E0',
    process.env.ADDRESS
  ])

  await vault.waitForDeployment()
  console.log(`vault with address: ${await vault.getAddress()}`)
  setConfig(`${network}.vault`, await vault.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
