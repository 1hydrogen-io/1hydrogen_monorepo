'use client'
import useProcessing from '@/lib/hooks/useProcessing';
import { fetchWalletInfoGlobalAction, getEthPriceAction } from '@/lib/reduxs/globals/global.action';
import { useAppDispatch } from '@/lib/reduxs/hooks';
import { useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi';

export default function WalletListener() {
  const {isConnected, address} = useAccount();
  const {onOpenProcessing, onCloseProcessing} = useProcessing();

  const dispatch = useAppDispatch();

  const onListeningChang = useCallback(async() => {
    onOpenProcessing();
    try {
      await dispatch(fetchWalletInfoGlobalAction()).unwrap();
    } catch(ex) {}
    onCloseProcessing();
  }, [isConnected, address])

  useEffect(() => {
    onListeningChang()
  }, [onListeningChang]);


  return null;
}
