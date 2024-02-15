import { createSlice } from "@reduxjs/toolkit";
import { fetchSTotalStakedAction, fetchVaulStakedInfo } from "./vaul.actions";
import { IVaulStaked, default_return } from "./vaul.type";

interface VaulState {
  vaulStaked: IVaulStaked;
  sTotalStaked: number;
}

const initialState: VaulState = {
  vaulStaked: default_return,
  sTotalStaked: 0,
};

export const vaulSlice = createSlice({
  name: "vaul",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
     builder.addCase(fetchVaulStakedInfo.fulfilled, (state, {payload}) => {
      state.vaulStaked = payload;
     })
     builder.addCase(fetchSTotalStakedAction.fulfilled, (state, {payload}) => {
      state.sTotalStaked = payload;
     })
  },
});
export default vaulSlice.reducer;

export const { 

} = vaulSlice.actions;
