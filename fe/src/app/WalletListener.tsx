'use client'
import useProcessing from '@/lib/hooks/useProcessing';
import useRefetchBalance from '@/lib/hooks/useRefetchBalance';
import { fetchWalletInfoGlobalAction } from '@/lib/reduxs/globals/global.action';
import { useAppDispatch } from '@/lib/reduxs/hooks';
import { getPackageAction } from '@/lib/reduxs/hs-stakings/hs-staking.actions';
import { useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi';

export default function WalletListener() {
  const {isConnected, address} = useAccount();
  const {onOpenProcessing, onCloseProcessing} = useProcessing();
  const {onFetchVaulStakedInfo, onFetchSTotalStaked} = useRefetchBalance();

  const dispatch = useAppDispatch();

  const onListeningChang = useCallback(async() => {
    onOpenProcessing();
    try {
      await dispatch(fetchWalletInfoGlobalAction()).unwrap();
      onFetchVaulStakedInfo();
    } catch(ex) {}
    onCloseProcessing();
  }, [isConnected, address])

  const getPackage = useCallback(async() => {
    dispatch(getPackageAction())
  }, []);

  useEffect(() => {
    onListeningChang()
  }, [onListeningChang]);

  useEffect(() => {
    getPackage();
  },[]);

  useEffect(() => {
    onFetchSTotalStaked();
  },[]);



  return null;
}
