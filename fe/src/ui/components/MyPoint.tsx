'use client'
import { Flex, FlexProps, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import { MainTitle, TextCus } from './Text'
import { useAppSelector } from '@/lib/reduxs/hooks';

interface IProps   extends FlexProps {
  isLager?: boolean;
}

export default function MyPoint({isLager,  ...props}: IProps) {
    const {balance: {point}} = useAppSelector(p => p.wallet);
  
  if (!isLager) {
    return (
      <Flex
        fontSize="100px"
        color="red"
        w="222px"
        h="195px"
        bgImage="/my-point-bg.png"
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPosition="center"
        overflow="hidden"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="11px"
        {...props}
      >
        <MainTitle fontSize="22px" lineHeight="100%">
          My Points
        </MainTitle>
        <MainTitle fontSize="44px" fontWeight="800" lineHeight="100%">
          {point.point ?? 0}
        </MainTitle>
        <HStack
          bg="#0F1535"
          w="128px"
          h="26px"
          borderRadius="8px"
          mt="16px"
          justifyContent="center"
          gap="5px"
        >
          <Image src="/lb.svg" />
          <Flex>
            <TextCus>2323/</TextCus>
            <TextCus color="#A0AEC0">32332</TextCus>
          </Flex>
        </HStack>
      </Flex>
    );
  }


  return (
    <Flex
      fontSize="100px"
      color="red"
      w="468px"
      h="330px"
      bgImage="/my-point-bg-lg.png"
      bgSize="contain"
      bgRepeat="no-repeat"
      bgPosition="center"
      overflow="hidden"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="space-between"
      gap="11px"
      p="24px"
      {...props}
    >
      <MainTitle fontSize="22px" lineHeight="100%">
        My Points
      </MainTitle>
      <MainTitle fontSize="44px" fontWeight="800" lineHeight="100%">
        {point.point ?? 0}
      </MainTitle>
      <HStack
        bg="#0F1535"
        w="128px"
        h="26px"
        borderRadius="8px"
        mt="16px"
        justifyContent="center"
        gap="5px"
      >
        <Image src="/lb.svg" />
        <Flex>
          <TextCus>2323/</TextCus>
          <TextCus color="#A0AEC0">32332</TextCus>
        </Flex>
      </HStack>
    </Flex>
  );
}
