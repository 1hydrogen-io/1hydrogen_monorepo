'use client'
import { useAppSelector } from '@/lib/reduxs/hooks';
import { LabelValueItem } from '@/ui/components'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function BalanceInfo() {
  const {balance} = useAppSelector(p => p.wallet);
  const {stakedAmount} = useAppSelector(p => p.hsStake);
  return (
    <Flex w="full" flexDirection="column" gap="16px">
      <LabelValueItem label="Staked Amount" value={`${stakedAmount} $hsETH`} />
      <LabelValueItem label="Wallet Balance" value={`${balance.hsEth} $hsETH`} />
    </Flex>
  );
}
