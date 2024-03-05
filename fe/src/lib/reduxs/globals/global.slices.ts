import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isProcessing?: boolean;
  ethPrice: number;
  processName?: string;
  currentCoin: "eth" | "usdb"
}

const initialState: GlobalState = {
  isProcessing: false,
  ethPrice: 0,
  currentCoin: "eth"
};

export const globalSlice = createSlice({
  name: "global-reducer",
  initialState,
  reducers: {
    setProcessingAction: (state, { payload }: PayloadAction<boolean | undefined>) => {
      state.isProcessing = payload;
    },
    setProcessNameAction: (state, {payload}: PayloadAction<string | undefined>) => {
      state.processName = payload;
    },
    setCurrentCoinAction: (state, {payload}: PayloadAction<"eth" | "usdb">) => {
      state.currentCoin = payload;
    }
  }
});

export default globalSlice.reducer;

export const { 
  setProcessingAction,
  setProcessNameAction,
    setCurrentCoinAction
} = globalSlice.actions;
