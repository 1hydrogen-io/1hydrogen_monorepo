import { BigNumber, ethers } from 'ethers';
import { getRPC, isProduction } from '../utls';
import { Erc20 } from './interfaces'
import Abi from "./abis/val.json";
import { TransactionResponse } from '@ethersproject/abstract-provider';


export const ADDRESS = () =>
  isProduction()
    ? ""
    : "0xbc6Af48e302dbFfBA2F3d19F19C2015A8832f06C";

export default class VaultContract extends Erc20 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, ADDRESS(), Abi, signer);
  }

  stakeMutation = async(amount: number) => {
      const rp: TransactionResponse = await this._contract.stake({...this._option, value: this._toWei(amount)});
      return this._handleTransactionResponse(rp);
  }

  unStakeMutation = async(amount: number) => {
    const rp: TransactionResponse = await this._contract.unStake(this._toWei(amount), this._option);
    return this._handleTransactionResponse(rp);
}

  stakedBalance = async(address: string) => {
    const balance = await this._contract.stakedBalance(address);
    return this._toNumberBalance(balance);
  }
  availableBalance = async(address: string) => {
    const balance = await this._contract.availableBalance(address);
    return this._toNumberBalance(balance);
  }

  sTotalStaked = async() => {
    const balance = await this._contract.sTotalStaked();
    return this._toNumberBalance(balance);
  }

  claimHsEthMutation = async(amount: number) => {
    const response:TransactionResponse = await this._contract.claimHsEth(this._toWei(amount), this._option);
    return this._handleTransactionResponse(response);
  }

  repayHsEthMutation = async(amount: number) => {
    const response:TransactionResponse = await this._contract.repayHsEth(this._toWei(amount), this._option);
    return this._handleTransactionResponse(response);
  }

  

}