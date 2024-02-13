import { ethers } from "ethers";
import { Erc20 } from "./interfaces";
import Abi from "./abis/base_eth.json";
import { getBaseRPC, isProduction } from "../utls";

export const ADDRESS = () =>
  isProduction()
    ? ""
    : "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70";

export default class BaseEthContract extends Erc20 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getBaseRPC());
    super(rpcProvider, ADDRESS(), Abi, signer);
  }

  getPrice = async()=> {
    const price = await this._contract.latestAnswer();
    return this._toNumberBalance(price, 8);
  }
}
