import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isProcessing?: boolean;
  ethPrice: number;
  processName?: string;
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
    setProcessNameAction: (state, {payload}: PayloadAction<string | undefined>) => {
      state.processName = payload;
    }
  }
});

export default globalSlice.reducer;

export const { 
  setProcessingAction,
  setProcessNameAction,
} = globalSlice.actions;
