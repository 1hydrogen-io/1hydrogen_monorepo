import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchWalletBalanceAction } from "./staking.actions";
import { IWalletBalance } from "./staking.type";

interface StakingState {
  balance: IWalletBalance;
  isProcessing?: boolean;
}

const initialState: StakingState = {
  balance: {
    eth: 0,
  },
  isProcessing: false,
};

export const stakeSlice = createSlice({
  name: "stake",
  initialState,
  reducers: {
    setProcessingAction: (state, { payload }: PayloadAction<boolean | undefined>) => {
      state.isProcessing = payload;
    },
  },
  extraReducers: (builder) => {
      builder.addCase(
        fetchWalletBalanceAction.fulfilled,
        (state, { payload }) => {
          state.balance = payload;
        }
      );
  },
});
export default stakeSlice.reducer;

export const { 
  setProcessingAction,
} = stakeSlice.actions;
