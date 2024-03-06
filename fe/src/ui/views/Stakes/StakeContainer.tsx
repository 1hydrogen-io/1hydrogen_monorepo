import React from 'react'
import CardCus from '../Commons/CardCus'
import { Flex } from '@chakra-ui/react'
import SubText from '@/ui/components/Text/SubText'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import StakePackageContainer from './StakePackageContainer'
import MintButton from './MintButton'
import InputHsEthStake from './InputHsTokenStake'
import BalanceInfo from './BalanceInfo'
import LockedPosition from './LockedPosition'

export default function StakeContainer() {
  return (
    <CardCus gap="40px" py="60px">
      <Flex w="full" flexDirection="column">
        <StakePackageContainer />
        <SubText fontSize="12px" mt="12px">
          Multiplier applies to amount of hPoints generated and % of Yield each
          of the pools receives.
        </SubText>
      </Flex>
      <BalanceInfo />
      <InputHsEthStake />
      
      {/* <Flex justifyContent="space-between">
        <LabelValueColumn label="Current APR Rate" value="1%" />
        <LabelValueColumn
          label="Maturity Date"
          value="--"
          justifyContent="center"
          alignItems="center"
        />
        <LabelValueColumn label="Reward Balance" value="--" />
      </Flex> */}
      <MintButton />


      <LockedPosition />
    </CardCus>
  );
}
