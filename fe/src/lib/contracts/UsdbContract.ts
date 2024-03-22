import { ethers } from "ethers";
import { Erc20 } from "./interfaces";
import { usdbAbi } from "./abis/usdb";
import { getBaseRPC, isProduction } from "../utls";

export const ADDRESS = () =>
  isProduction()
    ? "0x4300000000000000000000000000000000000003"
    : "0x4200000000000000000000000000000000000022";

export default class UsdbContract extends Erc20 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getBaseRPC());
    super(rpcProvider, ADDRESS(), usdbAbi, signer);
  }

  getPrice = async () => {
    const price = await this._contract.price();
    return this._toNumberBalance(price, 8);
  };
}
