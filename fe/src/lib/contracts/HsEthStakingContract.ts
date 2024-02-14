import { BigNumber, ethers } from 'ethers';
import { getRPC, isProduction } from '../utls';
import { Erc20 } from './interfaces'
import Abi from "./abis/hs_eth_staking.json";
import { TransactionResponse } from '@ethersproject/abstract-provider';

export const ADDRESS = () =>
  isProduction()
    ? ""
    : "0xeA2eafa943e7dB674295FF7F5c528E0618e67162";

export default class HsEthStakingContract extends Erc20 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, ADDRESS(), Abi, signer);
  }

  stakedBalance = async(address: string): Promise<number> => {
    const response = await this._contract.stakedBalance(address);
    return this._toNumberBalance(response);
  }

  stake = async(pack: string, amount: number) => {
    const response: TransactionResponse = await this._contract.stake(pack, this._toWei(amount), this._option);
    return this._handleTransactionResponse(response);
  }

  getPoolInfo = async() => {
    const response:BigNumber[] = await this._contract.poolInfor();
    const rpNumber = response.map((p) => this._toNumberBalance(p));
    console.log({rpNumber})

    return {
      locked: rpNumber[0],
      totalStaked: rpNumber.reduce((pre, cur) => pre + cur, 0)
    }
  }
} 
