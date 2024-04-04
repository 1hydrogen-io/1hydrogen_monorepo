import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isProcessing?: boolean;
  ethPrice: number;
  processName?: string;
  currentCoin: "eth" | "usdb";
  joinCode: string;
  totalUserActive: number;
}

const initialState: GlobalState = {
  isProcessing: false,
  ethPrice: 0,
  currentCoin: "eth",
  joinCode: "",
  totalUserActive: 0,
};

export const globalSlice = createSlice({
  name: "global-reducer",
  initialState,
  reducers: {
    setProcessingAction: (
      state,
      { payload }: PayloadAction<boolean | undefined>
    ) => {
      state.isProcessing = payload;
    },
    setProcessNameAction: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      state.processName = payload;
    },
    setCurrentCoinAction: (
      state,
      { payload }: PayloadAction<"eth" | "usdb">
    ) => {
      state.currentCoin = payload;
    },
    setJoinCode: (state, { payload }: PayloadAction<string>) => {
      state.joinCode = payload;
    },
    setTotalUserActiveAction: (state, { payload }: PayloadAction<number>) => {
      state.totalUserActive = payload;
    },
  },
});

export default globalSlice.reducer;

export const {
  setProcessingAction,
  setProcessNameAction,
  setCurrentCoinAction,
  setJoinCode,
  setTotalUserActiveAction,
} = globalSlice.actions;
