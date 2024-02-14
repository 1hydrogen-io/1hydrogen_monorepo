import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getEthPriceAction } from "./global.action";

interface GlobalState {
  isProcessing?: boolean;
  ethPrice: number;
}

const initialState: GlobalState = {
  isProcessing: false,
  ethPrice: 0,
};

export const globalSlice = createSlice({
  name: "global",
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
