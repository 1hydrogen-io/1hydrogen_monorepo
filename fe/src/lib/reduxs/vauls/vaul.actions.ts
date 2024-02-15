import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEthersSigner } from "@/lib/hooks/useEtherSigner";
import VaultContract from "@/lib/contracts/VaultContract";
import { IVaulStaked, default_return } from "./vaul.type";


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

export const fetchSTotalStakedAction = createAsyncThunk<number, void>(
  'vaul/fetchSTotalStakedAction',
  async() => {
    const vaulContract = new VaultContract();
    const sTotalStaked = await vaulContract.sTotalStaked();
    return sTotalStaked;
  }
)