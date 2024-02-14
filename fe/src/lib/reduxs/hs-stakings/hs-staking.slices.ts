import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PackageType } from "./hs-staking.type";
import { getHsEthStakingInfoAction } from "./hs-staking.actions";


interface HsStakingState {
  totalHsEthStaked: number;
  totalHsEthLocked: number;
  myPoint: number;
  stakedAmount: number;

  packageSelected: PackageType;
  hsEthAmount: string;
  
}

const initialState: HsStakingState = {
  totalHsEthLocked: 0,
  totalHsEthStaked: 0,
  myPoint: 0,
  stakedAmount: 0,

  packageSelected: '0',
  hsEthAmount: '0',
};

export const hsStakingSlice = createSlice({
  name: "hs-stake",
  initialState,
  reducers: {
    setHsEthAmountAction: (state, { payload }: PayloadAction<string>) => {
      state.hsEthAmount = payload;
    },
    setPackageAction: (state, {payload}: PayloadAction<PackageType>) => {
      state.packageSelected = payload;
    },
    resetUserValue: (state) => {
      state.hsEthAmount = '0';
      state.packageSelected = '0';
    }
  },
  extraReducers: (builder) => {
     builder.addCase(getHsEthStakingInfoAction.fulfilled, (state, {payload}) => {
      const {locked, stakedAmount, totalStaked} = payload;
      state.stakedAmount = stakedAmount;
      state.totalHsEthLocked = locked;
      state.totalHsEthStaked = totalStaked;
     })
  },
});
export default hsStakingSlice.reducer;

export const { 
  setHsEthAmountAction,
  setPackageAction,
  resetUserValue,
} = hsStakingSlice.actions;
