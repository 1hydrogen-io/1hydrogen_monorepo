import { LabelValueItem, MyPoint } from '@/ui/components'
import AppWrapper from '@/ui/components/AppWrapper'
import ButtonCustom from '@/ui/components/ButtonCustom'
import ButtonTab from '@/ui/components/ButtonTab'
import DropdownCustom from '@/ui/components/DropdownCustom'
import InputCustom from '@/ui/components/InputCustom'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import { TextCus } from '@/ui/components/Text'
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
           <StakedLockedAPR />
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
