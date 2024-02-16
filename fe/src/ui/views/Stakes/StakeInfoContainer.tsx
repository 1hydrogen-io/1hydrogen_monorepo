'use client'
import useBaseEthContract from '@/lib/hooks/useBaseEthContract';
import { useAppSelector } from '@/lib/reduxs/hooks';
import { balanceFormatWithPrefix } from '@/lib/utls';
import { MyPoint } from '@/ui/components';
import StakeCard from '@/ui/components/StakeCard';
import { Flex } from '@chakra-ui/react';
import React from 'react'
import TotalHsEthStakedAndLocked from '../Commons/TotalHsEthStakedAndLocked';

export default function StakeInfoContainer() {
  const  {ethUsdt} = useBaseEthContract();
  const {totalHsEthLocked, totalHsEthStaked} = useAppSelector(p => p.hsStake);
  
  return (
    <Flex flexDirection="column" w="full" gap="25px">
      <MyPoint />
      <TotalHsEthStakedAndLocked />
    </Flex>
  );
}
