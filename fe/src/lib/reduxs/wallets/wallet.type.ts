import {IWalletPoint} from "@/lib/apis/account.api";

export interface IWalletBalance {
    eth: number;
    hsEth: number;
    point: IWalletPoint;
    hsUsdb: number;
}