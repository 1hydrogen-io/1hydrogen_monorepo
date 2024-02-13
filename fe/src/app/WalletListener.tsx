'use client'
import { useAppDispatch } from '@/lib/reduxs/hooks';
import { fetchWalletBalanceAction } from '@/lib/reduxs/stakings/staking.actions';
import { useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi';

export default function WalletListener() {
  const {isConnected, address} = useAccount();

  const dispatch = useAppDispatch();

  const onListeningChang = useCallback(() => {
    dispatch(fetchWalletBalanceAction())
  }, [isConnected, address])

  useEffect(() => {
    onListeningChang()
  }, [onListeningChang]);

  return null;
}
