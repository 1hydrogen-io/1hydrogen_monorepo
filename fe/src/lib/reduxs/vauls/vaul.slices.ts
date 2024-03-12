import {createSlice} from "@reduxjs/toolkit";
import {
    fetchSTotalStakedAction,
    fetchUsdbSTotalStakedAction,
    fetchUsdbVaulStakedInfo,
    fetchVaulStakedInfo
} from "./vaul.actions";
import {IVaulStaked, default_return} from "./vaul.type";

interface VaulState {
    vaulStaked: IVaulStaked;
    sTotalStaked: number;
    usdbVaulStaked: IVaulStaked;
    usdbSTotalStaked: number;
}

const initialState: VaulState = {
    vaulStaked: default_return,
    sTotalStaked: 0,
    usdbVaulStaked: default_return,
    usdbSTotalStaked: 0,
};

export const vaulSlice = createSlice({
    name: "vaul",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVaulStakedInfo.fulfilled, (state, {payload}) => {
            state.vaulStaked = payload;
        })
        builder.addCase(fetchSTotalStakedAction.fulfilled, (state, {payload}) => {
            state.sTotalStaked = payload;
        })
        builder.addCase(fetchUsdbVaulStakedInfo.fulfilled, (state, {payload}) => {
            state.usdbVaulStaked = payload;
        })
        builder.addCase(fetchUsdbSTotalStakedAction.fulfilled, (state, {payload}) => {
            state.usdbSTotalStaked = payload;
        })
    },
});
export default vaulSlice.reducer;

export const {} = vaulSlice.actions;
