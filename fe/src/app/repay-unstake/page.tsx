import { MyPoint } from '@/ui/components'
import AppWrapper from '@/ui/components/AppWrapper'
import ButtonTab from '@/ui/components/ButtonTab'
import CardCus from '@/ui/views/Commons/CardCus'
import StakedLockedAPR from '@/ui/views/Commons/StakedLockedAPR'
import RepayContainer from '@/ui/views/RepayUnStacks/RepayContainer'
import UnstackContainer from '@/ui/views/RepayUnStacks/UnstackContainer'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function RePayUnStake() {
  return (
    <AppWrapper gap="20px">
      <Flex w="full" gap="25px" mt="35px">
        <Flex gap="8px" flexDirection="column">
          <ButtonTab img="/coins/eth.svg" title="ETH MARKET" active />
          <ButtonTab img="/coins/usdb.svg" title="USDB MARKET" />
        </Flex>

        <CardCus gap="40px">
           <StakedLockedAPR isShowPoint />
           <UnstackContainer />
          <RepayContainer />
        </CardCus>
        <Flex flexDirection="column" w="full" gap="25px">
          <MyPoint />
        </Flex>
      </Flex>
    </AppWrapper>
  );
}