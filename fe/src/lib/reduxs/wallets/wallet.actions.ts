import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWalletBalance } from "./wallet.type";
import { getEthersSigner } from "@/lib/hooks/useEtherSigner";
import HsEthContract from "@/lib/contracts/HsEthContract";
import { toNumberBalance } from "@/lib/contracts/utils/common";
import { getWalletPointApi } from "@/lib/apis/account.api";

export const default_balance: IWalletBalance = {
  eth: 0,
  hsEth: 0,
  point: 0,
}

export const fetchWalletBalanceAction = createAsyncThunk<IWalletBalance, void>("wallet/fetchWalletBalanceAction",async () => {
 try {
  const signer = await getEthersSigner();
  if (!signer) return default_balance;
  const walletAddress = await signer.getAddress();
  const ethBalance = await signer.getBalance();
  const hsEthContract = new HsEthContract();
  const hsBalance = await hsEthContract.balanceOf(walletAddress);
  const yourPoint = await getWalletPointApi(walletAddress);
  
  return {
    eth: toNumberBalance(ethBalance),
    hsEth: hsBalance,
    point: yourPoint.point
  };
 } catch(ex) {
    return default_balance;
 }
})