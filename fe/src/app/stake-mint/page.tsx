import { MyPoint } from '@/ui/components'
import AppWrapper from '@/ui/components/AppWrapper'
import ButtonTab from '@/ui/components/ButtonTab'
import StakeCard from '@/ui/components/StakeCard'
import CardCus from '@/ui/views/Commons/CardCus'
import StakedLockedAPR from '@/ui/views/Commons/StakedLockedAPR'
import MintVaulContainer from '@/ui/views/MintAndStakes/MintVaulContainer'
import StakeContainer from '@/ui/views/MintAndStakes/StakeContainer'
import StatMintStakeVaulContainer from '@/ui/views/MintAndStakes/StatMintStakeVaulContainer'
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
          <StakedLockedAPR isHideSubLabel />
          <StakeContainer />
          <MintVaulContainer />
         
        </CardCus>
        <StatMintStakeVaulContainer />
      </Flex>
    </AppWrapper>
  );
}
