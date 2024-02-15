import React from 'react'
import { useAppDispatch } from '../reduxs/hooks'
import { fetchWalletInfoGlobalAction } from '../reduxs/globals/global.action';
import { fetchSTotalStakedAction, fetchVaulStakedInfo } from '../reduxs/vauls/vaul.actions';

export default function useRefetchBalance() {
  const dispatch = useAppDispatch();

  const onRefetch = async()=> {
    await dispatch(fetchWalletInfoGlobalAction()).unwrap();
  }

  const onReFetchVaul = async()=> {
    await dispatch(fetchVaulStakedInfo()).unwrap();
    await dispatch(fetchSTotalStakedAction()).unwrap();
  }

  const onFetchVaulStakedInfo = async()=> {
    await dispatch(fetchVaulStakedInfo()).unwrap();
  }

  const onFetchSTotalStaked = async()=> {
    await dispatch(fetchSTotalStakedAction()).unwrap();
  }

  return {
    onRefetch,
    onReFetchVaul,
    onFetchVaulStakedInfo,
    onFetchSTotalStaked,
  }
}
