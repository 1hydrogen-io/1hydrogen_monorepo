'use client'
import ButtonCustom from '@/ui/components/ButtonCustom'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import { MainTitle } from '@/ui/components/Text'
import { Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { useAccount } from 'wagmi'

export default function LockedPosition() {
  const {isConnected} = useAccount();
  if (!isConnected) return null;
  return (
    <Flex w="full" flexDirection="column">
      <MainTitle mb="24px">Locked Positions</MainTitle>
      <VStack w="full" alignItems="flex-start" m="0px" gap="12px">
        {new Array(4).fill(0).map((lock, index) => (
          <Flex w="full" key={index} justifyContent="space-between">
            <LabelValueColumn
              label={"Locked Balance"}
              value={"--"}
              labelFontSize="10px"
            />
            <LabelValueColumn
              label={"Maturity Days Left"}
              value={"--"}
              labelFontSize="10px"
            />
            <LabelValueColumn
              label={"Reward Balance"}
              value={"--"}
              labelFontSize="10px"
            />
            <ButtonCustom
              disable={index === 3}
              gap='4px'
              w='94px'
            >
             {index === 3 && <Image src='/lock.svg' />}
              UNSTAKE
            </ButtonCustom>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
}
