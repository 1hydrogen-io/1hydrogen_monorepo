import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {PackageType} from "./hs-staking.type";
import {
    getHsEthStakingInfoAction,
    getHsUsdbStakingInfoAction,
    getPackageAction,
    getUsdbPackageAction
} from "./hs-staking.actions";
import {IPackage, IStakedInfo} from "@/lib/contracts/types";


interface HsStakingState {
    totalHsEthStaked: number;
    totalHsEthLocked: number;
    myPoint: number;
    stakedAmount: number;
    stakedInfos: IStakedInfo[];
    lockedHsETHBalance: number;
    packageSelected: PackageType;
    hsEthAmount: string;
    packages: IPackage[];

    totalHsUsdbStaked: number;
    totalHsUsdbLocked: number;
    usdbStakedAmount: number;
    usdbStakedInfos: IStakedInfo[];
    lockedHsUSDBBalance: number;
    usdbPackageSelected: PackageType;
    hsUsdbAmount: string;
    usdbPackages: IPackage[];
}

const initialState: HsStakingState = {
    totalHsEthLocked: 0,
    totalHsEthStaked: 0,
    myPoint: 0,
    stakedAmount: 0,
    stakedInfos: [],
    lockedHsETHBalance: 0,
    packageSelected: '0',
    hsEthAmount: '0',
    packages: [],


    totalHsUsdbStaked: 0,
    totalHsUsdbLocked: 0,
    usdbStakedAmount: 0,
    usdbStakedInfos: [],
    lockedHsUSDBBalance: 0,
    usdbPackageSelected: '0',
    hsUsdbAmount: '0',
    usdbPackages: [],
};

export const hsStakingSlice = createSlice({
    name: "hs-stake",
    initialState,
    reducers: {
        setHsEthAmountAction: (state, {payload}: PayloadAction<string>) => {
            state.hsEthAmount = payload;
        },
        setPackageAction: (state, {payload}: PayloadAction<PackageType>) => {
            state.packageSelected = payload;
        },
        resetUserValue: (state) => {
            state.hsEthAmount = '0';
            state.packageSelected = '0';
        },
        setHsUsdbAmountAction: (state, {payload}: PayloadAction<string>) => {
            state.hsUsdbAmount = payload;
        },
        setUsdbPackageAction: (state, {payload}: PayloadAction<PackageType>) => {
            state.usdbPackageSelected = payload;
        },
        resetUsdbUserValue: (state) => {
            state.hsUsdbAmount = '0';
            state.usdbPackageSelected = '0';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getHsEthStakingInfoAction.fulfilled, (state, {payload}) => {
            const {locked, stakedAmount, totalStaked, stakedInfos} = payload;
            state.stakedAmount = stakedAmount;
            state.totalHsEthLocked = locked;
            state.totalHsEthStaked = totalStaked;
            state.stakedInfos = stakedInfos;
            state.lockedHsETHBalance = stakedInfos.filter(p => p.package > 0).reduce((pre, cur) => pre + cur.amount, 0);
        })

        builder.addCase(getPackageAction.fulfilled, (state, {payload}) => {
            state.packages = payload;
        })

        builder.addCase(getHsUsdbStakingInfoAction.fulfilled, (state, {payload}) => {
            const {locked, stakedAmount, totalStaked, stakedInfos} = payload;
            state.usdbStakedAmount = stakedAmount;
            state.totalHsUsdbLocked = locked;
            state.totalHsUsdbStaked = totalStaked;
            state.usdbStakedInfos = stakedInfos;
            state.lockedHsUSDBBalance = stakedInfos.filter(p => p.package > 0).reduce((pre, cur) => pre + cur.amount, 0);
        })

        builder.addCase(getUsdbPackageAction.fulfilled, (state, {payload}) => {
            state.usdbPackages = payload;
        });
    },
});
export default hsStakingSlice.reducer;

export const {
    setHsEthAmountAction,
    setPackageAction,
    resetUserValue,
    setHsUsdbAmountAction,
    setUsdbPackageAction,
    resetUsdbUserValue
} = hsStakingSlice.actions;
