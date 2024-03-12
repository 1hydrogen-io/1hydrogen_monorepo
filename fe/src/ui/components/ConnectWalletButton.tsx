'use client'
import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { showSortAddress } from '@/lib/utls';
import { plus_jakarta_san } from '@/themes';
import { useGlobalState } from '@/lib/reduxs/globals/global.hook';
import { signMessageWallet } from '@/lib/apis/account.api';
import useToastCustom from '@/lib/hooks/useToastCustom';
import { useAppSelector } from '@/lib/reduxs/hooks';
import useRefetchBalance from "@/lib/hooks/useRefetchBalance";

export default function ConnectWalletButton() {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { globalState: { joinCode }, onSetJoinCode } = useGlobalState();
  const { onSuccessToast, onErrorToast } = useToastCustom();
  const { balance: { point } } = useAppSelector(p => p.wallet);
  const { onRefetchWalletPointAndCode } = useRefetchBalance();

  const signMessageWithJoinCode = async () => {
    try {
      const message = JSON.stringify({
        wallet: address,
        joinCode
      })
      const result = await signMessageAsync({
        message
      });
      if (result) {
        await signMessageWallet(address as string, joinCode, result)
        onSuccessToast('Sign message successfully!')
        await onRefetchWalletPointAndCode()
        onSetJoinCode('')
      }
    } catch (error: any) {
      onErrorToast(error?.message || 'Failed to sign message!')
    }
  }

  useEffect(() => {
    if (isConnected && address && joinCode) {
      signMessageWithJoinCode().then()
    }
  }, [isConnected, address, joinCode]);

  const handleOpenConnectWallet = () => {
    openConnectModal && openConnectModal();
  };

  if (isConnected && address) {
    return (
      <Flex
        p="6px 21px"
        borderRadius="full"
        gap="8px"
        cursor="pointer"
        bgColor="white"
        onClick={handleOpenConnectWallet}
      >
        <Text
          color="#030D20"
          fontFamily={plus_jakarta_san.style.fontFamily}
          fontWeight="800"
          fontSize="10px"
          lineHeight="150%"
          textTransform="uppercase"
        >
          {showSortAddress(address)}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      p='6px 21px'
      borderRadius='full'
      gap='8px' cursor='pointer'
      bgColor='white'
      onClick={handleOpenConnectWallet}
    >
      <Text color='#030D20'
        fontFamily={plus_jakarta_san.style.fontFamily}
        fontWeight='800'
        fontSize='10px'
        lineHeight='150%'
        textTransform='uppercase'
      >Connect Wallet</Text>
    </Flex>
  )
}
