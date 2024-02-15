'use client'
import { useAppSelector } from '@/lib/reduxs/hooks';
import { LabelValueItem } from '@/ui/components'
import { Flex } from '@chakra-ui/react'
import React, { useMemo } from 'react'

export default function BalanceInfo() {
  const {balance} = useAppSelector(p => p.wallet);
  const {stakedAmount, packages, packageSelected} = useAppSelector(p => p.hsStake);


  const stakedAprRate = useMemo(() => {
    if (packages.length < 1) return '0%';
    return packages[Number(packageSelected)].percent + '%';
  }, [packageSelected, packages]);

  return (
    <Flex w="full" flexDirection="column" gap="16px">
      <LabelValueItem label="Current APR Rate" value={stakedAprRate} />
      <LabelValueItem label="Staked Amount" value={`${stakedAmount} $hsETH`} />
      <LabelValueItem label="Wallet Balance" value={`${balance.hsEth} $hsETH`} />
    </Flex>
  );
}
