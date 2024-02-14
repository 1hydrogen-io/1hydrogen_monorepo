import { ethers } from 'ethers';
import { getRPC, isProduction } from '../utls';
import { Erc20 } from './interfaces'
import Abi from "./abis/hs_eth.json";

export const ADDRESS = () =>
  isProduction()
    ? ""
    : "0x55Ee887dB181B41f69b3313065b1eD6BEE3336A1";

export default class HsEthContract extends Erc20 {
  constructor(signer?: ethers.providers.JsonRpcSigner) {
    const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
    super(rpcProvider, ADDRESS(), Abi, signer);
  }
  
} 
