'use client'
import { useAppSelector } from '@/lib/reduxs/hooks'
import { liner_bg } from '@/themes'
import ButtonCustom from '@/ui/components/ButtonCustom'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function StatPointContainer() {
  const {balance: {point}} = useAppSelector(p => p.wallet);
  return (
    <Flex flexDirection="column" w="222px" gap="24px">
      <Flex
        w="full"
        h="226px"
        bg={liner_bg}
        borderRadius="20px"
        p="20px 24px"
        flexDir="column"
        justifyContent="space-between"
      >
        <LabelValueColumn
          label={"From Staking ETH / USDB"}
          labelFontSize="12px"
          value={point.supplyPoint}
        />
        <LabelValueColumn
          label={"From Staking hsETH / hsUSDB"}
          labelFontSize="12px"
          value={point.stakingPoint}
        />
        <LabelValueColumn
          label={"From Locking hsETH / hsUSDB"}
          labelFontSize="12px"
          value={point.stakingLockPoint}

        />
      </Flex>

      <Flex
        w="full"
        h="80px"
        bg={liner_bg}
        borderRadius="20px"
        p="20px 24px"
        justifyContent="space-between"
      >
        <LabelValueColumn
          labelFontSize="12px"
          label={"Daily points"}
          value={"--"}
        />
        <ButtonCustom h="35px">CLAIM</ButtonCustom>
      </Flex>
    </Flex>
  );
}
