import { ethers } from "ethers";
import { getRPC, isProduction } from "../utls";
import { Erc20 } from "./interfaces";
import Abi from "./abis/hs_eth.json";

export const ADDRESS = () =>
  isProduction()
    ? "0x7b59918a32b76de03e8665740289D7BBfEfCbF81"
    : "0x7C84156e5f873dB9f544459cb4aA6eC5fc45f67a";

export default class HsEthContract extends Erc20 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, ADDRESS(), Abi, signer);
  }
}
