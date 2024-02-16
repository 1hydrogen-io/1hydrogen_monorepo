import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWalletBalance } from "./wallet.type";
import { default_balance, fetchWalletBalanceAction } from "./wallet.actions";

interface WalletState {
 balance: IWalletBalance
}

const initialState: WalletState = {
  balance: default_balance
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
     builder.addCase(fetchWalletBalanceAction.fulfilled, (state, { payload }) => {
      state.balance = payload;
    })
  },
});
export default walletSlice.reducer;

export const { 
  
} = walletSlice.actions;
