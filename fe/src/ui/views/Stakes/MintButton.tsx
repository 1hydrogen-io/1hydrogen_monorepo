'use client'
import ButtonCustom from '@/ui/components/ButtonCustom'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useMemo } from 'react'
import { useAccount } from 'wagmi'

export default function MintButton() {
  const {isConnected} = useAccount();
  const {openConnectModal} = useConnectModal();

  const title = useMemo(() => {
    if (isConnected) return 'MINT';
    return 'CONNECT YOUR WALLET'
  }, [isConnected]);


  const handleClick = () => {
    if (!isConnected) {
      openConnectModal && openConnectModal();
    } else {

    }
  }

  return (
    <ButtonCustom w="full"
    onClick={handleClick}
    >{title}</ButtonCustom>
  )
}
