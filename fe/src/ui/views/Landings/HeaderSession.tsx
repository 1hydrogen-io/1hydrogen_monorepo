'use client'
import ButtonCustom from '@/ui/components/ButtonCustom';
import { MainTitle } from '@/ui/components/Text';
import { Flex, Spacer } from '@chakra-ui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React from 'react'
import { useAccount } from 'wagmi';

export default function HeaderSession() {
  const { openConnectModal } = useConnectModal();
  const {isConnected} = useAccount();

  const onOpenWalletModal = () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  }

  return (
    <Flex w="full" h="374px" justifyContent="space-between" mt='25px'>
      <Flex flex={1} flexDirection='column'>
        <MainTitle fontSize="56px" lineHeight="130%">
          A Blast Native Liquid Staking Protocol
        </MainTitle>
        <Spacer />
        <ButtonCustom w='239px' h='45px' onClick={onOpenWalletModal}>CONNECT WALLET</ButtonCustom>
      </Flex>
      
      <Flex
        w="410px"
        bgImage="/headers/icon.png"
        bgSize="contain"
        bgPosition="center"
        bgRepeat="no-repeat"
      ></Flex>
    </Flex>
  );
}
