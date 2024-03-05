'use client'
import useBaseEthContract from '@/lib/hooks/useBaseEthContract';
import { useAppSelector } from '@/lib/reduxs/hooks';
import { balanceFormatWithPrefix, numberFormat } from '@/lib/utls';
import StakeCard from '@/ui/components/StakeCard';
import React from 'react'

export default function TotalHsEthStakedAndLocked() {
  const  {ethUsdt} = useBaseEthContract();
  const {totalHsEthLocked, totalHsEthStaked} = useAppSelector(p => p.hsStake);
  return (
    <>
    <StakeCard
        subLabel={"Total hsETH Staked:"}
        value={numberFormat(totalHsEthStaked, 2)}
        percent=""
        totalVal={`$${balanceFormatWithPrefix(totalHsEthStaked * ethUsdt)}`}
      />
      <StakeCard
        subLabel={"Total hsETH Locked:"}
        value={numberFormat(totalHsEthLocked, 2)}
        percent=""
        totalVal={`$${balanceFormatWithPrefix(totalHsEthLocked * ethUsdt)}`}
      />
    </>
  )
}
