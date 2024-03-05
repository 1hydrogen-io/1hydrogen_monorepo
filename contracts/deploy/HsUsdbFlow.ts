import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'
import { readFile } from 'fs/promises'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const { hsUsdb, blastPointAddress, pointOperator, owner, usdb } = JSON.parse(
    await readFile(`./migrations/${network}/hsUsdb.json`, 'utf-8')
  )
  console.log('config', { hsUsdb, blastPointAddress, pointOperator, owner, usdb })
  const hsUSDB = await ethers.deployContract('HsUSDB')

  await hsUSDB.waitForDeployment()
  const hsUSDBAddress = await hsUSDB.getAddress()
  console.log(`hsUSDB with address: ${hsUSDBAddress}`)
  setConfig(`${network}.hsUSDB`, hsUSDBAddress)

  const vault = await ethers.deployContract('UsdbVault', [
    hsUSDBAddress,
    usdb,
    owner,
    blastPointAddress,
    pointOperator
  ])

  await vault.waitForDeployment()
  const vaultAddress = await vault.getAddress()
  console.log(`usdbVault with address: ${vaultAddress}`)
  setConfig(`${network}.usdbVault`, vaultAddress)

  const vaultFactory = await ethers.deployContract('UsdbVaultFactory', [
    hsUSDBAddress,
    usdb,
    blastPointAddress,
    pointOperator
  ])

  await vaultFactory.waitForDeployment()
  const vaultFactoryAddress = await vaultFactory.getAddress()
  console.log(`vaultFactory with address: ${vaultFactoryAddress}`)
  setConfig(`${network}.usdbVaultFactory`, vaultFactoryAddress)

  const hsUSDBStaking = await ethers.deployContract('UsdbStaking', [
    hsUSDBAddress,
    blastPointAddress,
    pointOperator
  ])

  await hsUSDBStaking.waitForDeployment()
  const hsUSDBStakingAddress = await hsUSDBStaking.getAddress()
  console.log(`hsUSDBStaking with address: ${hsUSDBStakingAddress}`)
  setConfig(`${network}.hsUSDBStaking`, hsUSDBStakingAddress)

  //grant role for vaul factory
  await hsUSDB.grantRole(await hsUSDB.DEFAULT_ADMIN_ROLE(), vaultFactoryAddress)

  //grant role for vault
  await hsUSDB.grantRole(await hsUSDB.MINTER_ROLE(), vaultAddress)

  await updateConfig()

  //verify command
  const hsETHVerify = `npx hardhat verify ${hsUSDBAddress} --network ${network}`

  const vaultVerify = `npx hardhat verify ${vaultAddress}  ${hsUSDBAddress} ${usdb} ${owner} ${blastPointAddress} ${pointOperator} --network ${network}`

  const vaultFactoryVerify = `npx hardhat verify ${vaultFactoryAddress}  ${hsUSDBAddress} ${usdb} ${blastPointAddress} ${pointOperator} --network ${network}`
  const stakingVerify = `npx hardhat verify ${hsUSDBStakingAddress}  ${hsUSDBAddress} ${blastPointAddress} ${pointOperator} --network ${network}`

  console.log({ hsETHVerify })
  console.log({ vaultVerify })

  console.log({ vaultFactoryVerify })
  console.log({ stakingVerify })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
