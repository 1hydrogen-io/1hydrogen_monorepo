import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'
  //usdb testnet: 0x4200000000000000000000000000000000000022
  //usdb mainnet: 0x4300000000000000000000000000000000000003
  const vault = await ethers.deployContract('UsdbVault', [
    '0xCA0AaF48356d44f254333C4F2C8Fc3295D00F602', //hsUsdb
    '0x4200000000000000000000000000000000000022',
    process.env.ADDRESS
  ])

  await vault.waitForDeployment()
  console.log(`vault with address: ${await vault.getAddress()}`)
  setConfig(`${network}.usdbVault`, await vault.getAddress())
  await updateConfig()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
