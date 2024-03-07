import {createAsyncThunk} from "@reduxjs/toolkit";
import {getEthersSigner} from "@/lib/hooks/useEtherSigner";
import VaultContract from "@/lib/contracts/VaultContract";
import {default_return, IVaulStaked} from "./vaul.type";
import UsdbVaultContract from "@/lib/contracts/UsdbVaultContract";


export const fetchVaulStakedInfo = createAsyncThunk<IVaulStaked, void>(
  'vaul/fetchVaulStakedInfo',
  async() => {
    const signer = await getEthersSigner();
    if (!signer) return default_return;
    const address = await signer.getAddress();
    const vaulContract = new VaultContract();
    const stakedBalance = await vaulContract.stakedBalance(address);
    const availableBalance = await vaulContract.availableBalance(address);
    return {
      stakedBalance,
      availableBalance,
    }
  }
)

export const fetchUsdbVaulStakedInfo = createAsyncThunk<IVaulStaked, void>(
    'vaul/fetchUsdbVaulStakedInfo',
    async() => {
        const signer = await getEthersSigner();
        if (!signer) return default_return;
        const address = await signer.getAddress();
        const usdbVaulContract = new UsdbVaultContract();
        const stakedBalance = await usdbVaulContract.stakedBalance(address);
        const availableBalance = await usdbVaulContract.availableBalance(address);
        return {
            stakedBalance,
            availableBalance,
        }
    }
)

export const fetchUsdbSTotalStakedAction = createAsyncThunk<number, void>(
    'vaul/fetchUsdbSTotalStakedAction',
    async() => {
        const usdbVaulContract = new UsdbVaultContract();
        return await usdbVaulContract.sTotalStaked();
    }
)

export const fetchSTotalStakedAction = createAsyncThunk<number, void>(
  'vaul/fetchSTotalStakedAction',
  async() => {
    const vaulContract = new VaultContract();
      return await vaulContract.sTotalStaked();
  }
)