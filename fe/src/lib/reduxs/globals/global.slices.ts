import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPackageAction } from "../hs-stakings/hs-staking.actions";

interface GlobalState {
  isProcessing?: boolean;
  ethPrice: number;
}

const initialState: GlobalState = {
  isProcessing: false,
  ethPrice: 0,
};

export const globalSlice = createSlice({
  name: "global-reducer",
  initialState,
  reducers: {
    setProcessingAction: (state, { payload }: PayloadAction<boolean | undefined>) => {
      state.isProcessing = payload;
    },
  }
});

export default globalSlice.reducer;

export const { 
  setProcessingAction,
} = globalSlice.actions;
