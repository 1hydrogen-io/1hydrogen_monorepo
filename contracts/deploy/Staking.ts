import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const staking = await ethers.deployContract('Staking', [
    '0x7C84156e5f873dB9f544459cb4aA6eC5fc45f67a', //hsETH
    '0x2fc95838c71e76ec69ff817983BFf17c710F34E0', // blast point
    process.env.ADDRESS //point operator
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
