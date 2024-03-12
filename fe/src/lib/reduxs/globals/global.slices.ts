import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isProcessing?: boolean;
  ethPrice: number;
  processName?: string;
  currentCoin: "eth" | "usdb",
  joinCode: string;
}

const initialState: GlobalState = {
  isProcessing: false,
  ethPrice: 0,
  currentCoin: "eth",
  joinCode: ""
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
    },
    setJoinCode: (state, {payload}: PayloadAction<string>) => {
      state.joinCode = payload;
    }
  }
});

export default globalSlice.reducer;

export const { 
  setProcessingAction,
  setProcessNameAction,
  setCurrentCoinAction,
  setJoinCode
} = globalSlice.actions;
