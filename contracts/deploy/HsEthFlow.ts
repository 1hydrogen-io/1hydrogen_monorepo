import { ethers, hardhatArguments } from 'hardhat'
import { initConfig, setConfig, updateConfig } from './ultil'
import { readFile } from 'fs/promises'

async function main() {
  await initConfig()
  const network = hardhatArguments.network ? hardhatArguments.network : 'dev'

  const { hsEth, blastAddress, blastPointAddress, pointOperator, owner } = JSON.parse(
    await readFile(`./migrations/${network}/hsEth.json`, 'utf-8')
  )
  console.log('config', { hsEth, blastAddress, blastPointAddress, pointOperator, owner })
  const hsETH = await ethers.deployContract('HsETH')

  await hsETH.waitForDeployment()
  const hsEthAddress = await hsETH.getAddress()
  console.log(`hsETH with address: ${hsEthAddress}`)
  setConfig(`${network}.hsETH`, hsEthAddress)

  const vault = await ethers.deployContract('Vault', [
    hsEthAddress,
    owner,
    blastAddress,
    blastPointAddress,
    pointOperator
  ])

  await vault.waitForDeployment()
  const vaultAddress = await vault.getAddress()
  console.log(`vault with address: ${vaultAddress}`)
  setConfig(`${network}.vault`, vaultAddress)

  const vaultFactory = await ethers.deployContract('VaultFactory', [
    hsEthAddress,
    blastAddress,
    blastPointAddress,
    pointOperator
  ])

  await vaultFactory.waitForDeployment()
  const vaultFactoryAddress = await vaultFactory.getAddress()
  console.log(`vaultFactory with address: ${vaultFactoryAddress}`)
  setConfig(`${network}.vaultFactory`, vaultFactoryAddress)

  const hsETHStaking = await ethers.deployContract('Staking', [
    hsEthAddress,
    blastPointAddress,
    pointOperator
  ])

  await hsETHStaking.waitForDeployment()
  const stakingAddress = await hsETHStaking.getAddress()
  console.log(`staking with address: ${stakingAddress}`)
  setConfig(`${network}.staking`, stakingAddress)

  //grant role for vaul factory
  await hsETH.grantRole(await hsETH.DEFAULT_ADMIN_ROLE(), vaultFactoryAddress)

  //grant role for vault
  await hsETH.grantRole(await hsETH.MINTER_ROLE(), vaultAddress)

  await updateConfig()

  //verify command
  const hsETHVerify = `npx hardhat verify ${hsEthAddress} --network ${network}`

  const vaultVerify = `npx hardhat verify ${vaultAddress}  ${hsEthAddress} ${owner} ${blastAddress} ${blastPointAddress} ${pointOperator} --network ${network}`

  const vaultFactoryVerify = `npx hardhat verify ${vaultFactoryAddress}  ${hsEthAddress} ${blastAddress} ${blastPointAddress} ${pointOperator} --network ${network}`
  const stakingVerify = `npx hardhat verify ${stakingAddress}  ${hsEthAddress} ${blastPointAddress} ${pointOperator} --network ${network}`

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
