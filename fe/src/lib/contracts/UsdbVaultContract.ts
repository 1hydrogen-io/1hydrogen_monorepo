import { BigNumber, ethers } from 'ethers';
import { getRPC, isProduction } from '../utls';
import { Erc20 } from './interfaces'
import Abi from "./abis/usdb_val.json";
import { TransactionResponse } from '@ethersproject/abstract-provider';


export const ADDRESS = () =>
    isProduction()
        ? ""
        : "0x02b436EAE5E1BAe083B9BB8eB03aAAcdd375985a";

export default class UsdbVaultContract extends Erc20 {
    constructor(signer?: ethers.providers.JsonRpcSigner) {
        const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
        super(rpcProvider, ADDRESS(), Abi, signer);
    }

    stakeMutation = async(amount: number) => {
        const rp: TransactionResponse = await this._contract.stake(this._toWei(amount), this._option);
        console.log(rp)
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

    claimHsUsdbMutation = async(amount: number) => {
        const response:TransactionResponse = await this._contract.claimHsUSDB(this._toWei(amount), this._option);
        console.log(response, "response")
        return this._handleTransactionResponse(response);
    }

    repayHsUsdbMutation = async(amount: number) => {
        const response:TransactionResponse = await this._contract.repayHsUsdb(this._toWei(amount), this._option);
        return this._handleTransactionResponse(response);
    }
}