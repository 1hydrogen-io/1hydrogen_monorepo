import { createSlice } from "@reduxjs/toolkit";

interface StakingState {
}

const initialState: StakingState = {
};

export const stakeSlice = createSlice({
  name: "stake",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
     
  },
});
export default stakeSlice.reducer;

export const { 

} = stakeSlice.actions;
