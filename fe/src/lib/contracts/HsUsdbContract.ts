import { ethers } from "ethers";
import { getRPC, isProduction } from "../utls";
import { Erc20 } from "./interfaces";
import Abi from "./abis/hs_usdb.json";

export const ADDRESS = () =>
  isProduction()
    ? "0x1E9978C70F376784b4E7aA9D4C1E4D9a6bd8eeF7"
    : "0xCA0AaF48356d44f254333C4F2C8Fc3295D00F602";

export default class HsUsdbContract extends Erc20 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, ADDRESS(), Abi, signer);
  }
}
