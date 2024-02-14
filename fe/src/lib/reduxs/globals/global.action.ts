import { createAsyncThunk } from "@reduxjs/toolkit";
import store from "../store";
import { getHsEthStakingInfoAction } from "../hs-stakings/hs-staking.actions";
import { fetchWalletBalanceAction } from "../wallets/wallet.actions";
import BaseEthContract from "@/lib/contracts/BaseEtherContract";

export const fetchWalletInfoGlobalAction = createAsyncThunk<void, void>(
  "global/fetchWalletInfoGlobalAction",
  async () => {
    await store.dispatch(fetchWalletBalanceAction()).unwrap();
    await store.dispatch(getHsEthStakingInfoAction()).unwrap();
  }
);

export const getEthPriceAction = createAsyncThunk<number, void>(
  'global/getEthPriceAction',
  async () => {
    const baseContract = new BaseEthContract();
    const price = await baseContract.getPrice();
    console.log({price})
    return price;
  }
)