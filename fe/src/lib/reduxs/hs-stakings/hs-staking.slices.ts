import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PackageType } from "./hs-staking.type";
import { getHsEthStakingInfoAction } from "./hs-staking.actions";
import { IStakedInfo } from "@/lib/contracts/types";


interface HsStakingState {
  totalHsEthStaked: number;
  totalHsEthLocked: number;
  myPoint: number;
  stakedAmount: number;

  stakedInfos: IStakedInfo[];

  packageSelected: PackageType;
  hsEthAmount: string;
  
}

const initialState: HsStakingState = {
  totalHsEthLocked: 0,
  totalHsEthStaked: 0,
  myPoint: 0,
  stakedAmount: 0,
  stakedInfos: [],

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
      const {locked, stakedAmount, totalStaked, stakedInfos} = payload;
      state.stakedAmount = stakedAmount;
      state.totalHsEthLocked = locked;
      state.totalHsEthStaked = totalStaked;
      state.stakedInfos = stakedInfos;
     })
  },
});
export default hsStakingSlice.reducer;

export const { 
  setHsEthAmountAction,
  setPackageAction,
  resetUserValue,
} = hsStakingSlice.actions;
