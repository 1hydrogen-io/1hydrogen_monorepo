import React from 'react'
import { useAppDispatch } from '../reduxs/hooks'
import { fetchWalletInfoGlobalAction } from '../reduxs/globals/global.action';
import {
  fetchSTotalStakedAction,
  fetchUsdbSTotalStakedAction,
  fetchUsdbVaulStakedInfo,
  fetchVaulStakedInfo
} from '../reduxs/vauls/vaul.actions';
import {fetchWalletBalanceAction} from "@/lib/reduxs/wallets/wallet.actions";

export default function useRefetchBalance() {
  const dispatch = useAppDispatch();

  const onRefetch = async()=> {
    await dispatch(fetchWalletInfoGlobalAction()).unwrap();
  }

  const onRefetchWalletPointAndCode = async () => {
    await dispatch(fetchWalletBalanceAction()).unwrap();
  }

  const onReFetchVaul = async()=> {
    await dispatch(fetchVaulStakedInfo()).unwrap();
    await dispatch(fetchSTotalStakedAction()).unwrap();
  }

  const onReFetchUsdbVaul = async()=> {
    await dispatch(fetchUsdbVaulStakedInfo()).unwrap();
    await dispatch(fetchUsdbSTotalStakedAction()).unwrap();
  }

  const onFetchUsdbVaulStakedInfo = async()=> {
    await dispatch(fetchUsdbVaulStakedInfo()).unwrap();
  }

  const onFetchVaulStakedInfo = async()=> {
    await dispatch(fetchVaulStakedInfo()).unwrap();
  }

  const onFetchSTotalStaked = async()=> {
    await dispatch(fetchSTotalStakedAction()).unwrap();
  }

  const onFetchUsdbSTotalStaked = async()=> {
    await dispatch(fetchUsdbSTotalStakedAction()).unwrap();
  }

  return {
    onRefetch,
    onReFetchVaul,
    onFetchVaulStakedInfo,
    onFetchSTotalStaked,
    onReFetchUsdbVaul,
    onFetchUsdbVaulStakedInfo,
    onFetchUsdbSTotalStaked,
    onRefetchWalletPointAndCode
  }
}
