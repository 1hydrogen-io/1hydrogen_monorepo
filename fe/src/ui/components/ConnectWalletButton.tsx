'use client'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { showSortAddress } from '@/lib/utls';
import { plus_jakarta_san } from '@/themes';

export default function ConnectWalletButton() {
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount(); 

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
