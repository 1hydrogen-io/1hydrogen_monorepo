import { MyPoint } from '@/ui/components';
import { Flex } from '@chakra-ui/react';
import React from 'react'
import TotalHsEthStakedAndLocked from '../Commons/TotalHsEthStakedAndLocked';

export default function StakeInfoContainer() {
  
  return (
    <Flex flexDirection="column" w="full" gap="25px">
      <MyPoint />
      <TotalHsEthStakedAndLocked />
    </Flex>
  );
}
