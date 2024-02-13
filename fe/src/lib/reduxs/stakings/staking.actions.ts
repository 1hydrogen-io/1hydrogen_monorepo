import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWalletBalance } from "./staking.type";
import { getEthersSigner } from "@/lib/hooks/useEtherSigner";
import { getEthBalance } from "@/lib/utls";


export const fetchWalletBalanceAction = createAsyncThunk<IWalletBalance, void>("staking/fetchWalletBalanceAction",async () => {
 try {
  const signer = await getEthersSigner();
  if (!signer) return {eth: 0, fyEth: 0};
  const address = await signer.getAddress();
  const eth = await getEthBalance(address);
  return {
    eth
  }
 } catch(ex) {
  return {eth: 0};
 }
})