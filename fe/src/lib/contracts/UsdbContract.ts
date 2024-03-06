import { ethers } from "ethers";
import { Erc20 } from "./interfaces";
import Abi from "./abis/usdb.json";
import { getBaseRPC, isProduction } from "../utls";

export const ADDRESS = () =>
    isProduction()
        ? ""
        : "0x4200000000000000000000000000000000000022";

export default class UsdbContract extends Erc20 {
    constructor(signer?: ethers.providers.JsonRpcSigner) {
        const rpcProvider = new ethers.providers.JsonRpcProvider(getBaseRPC());
        super(rpcProvider, ADDRESS(), Abi, signer);
    }

    getPrice = async()=> {
        const price = await this._contract.latestAnswer();
        return this._toNumberBalance(price, 8);
    }
}
