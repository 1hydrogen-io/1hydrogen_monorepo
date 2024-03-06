import {createAsyncThunk} from "@reduxjs/toolkit";
import store from "../store";
import {getHsEthStakingInfoAction, getHsUsdbStakingInfoAction} from "../hs-stakings/hs-staking.actions";
import {fetchWalletBalanceAction} from "../wallets/wallet.actions";

export const fetchWalletInfoGlobalAction = createAsyncThunk<void, void>(
  "global/fetchWalletInfoGlobalAction",
  async () => {
    await store.dispatch(fetchWalletBalanceAction()).unwrap();
    await store.dispatch(getHsEthStakingInfoAction()).unwrap();
    await store.dispatch(getHsUsdbStakingInfoAction()).unwrap();
  }
);


