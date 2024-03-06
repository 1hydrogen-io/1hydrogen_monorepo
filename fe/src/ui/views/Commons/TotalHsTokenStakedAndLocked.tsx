'use client'
import useBaseEthContract from '@/lib/hooks/useTokenContract';
import { useAppSelector } from '@/lib/reduxs/hooks';
import {balanceFormatWithPrefix, isProduction, numberFormat} from '@/lib/utls';
import StakeCard from '@/ui/components/StakeCard';
import React from 'react'
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";
import {useContractRead} from "wagmi";
import {usdbAbi} from "@/lib/contracts/abis/usdb";
import {BigNumber, ethers} from "ethers";

export default function TotalHsTokenStakedAndLocked() {
  const  {ethUsdt} = useBaseEthContract();
  const {totalHsEthLocked, totalHsEthStaked, totalHsUsdbStaked, totalHsUsdbLocked} = useAppSelector(p => p.hsStake);
  const {globalState: {currentCoin}} = useGlobalState();
  const isEthSelected = currentCoin === "eth";

  const {
    data: usdbPriceData = BigInt(0),
  } = useContractRead({
    abi: usdbAbi,
    address: isProduction() ? '0x4200000000000000000000000000000000000022' : '0x4200000000000000000000000000000000000022',
    functionName: 'price',
  })

  const usdbPrice = ethers.utils.formatUnits(usdbPriceData as BigNumber);
  return (
    <>
    <StakeCard
        subLabel={isEthSelected ? "Total hsETH Staked:" : "Total hsUSDB Staked:"}
        value={isEthSelected ? numberFormat(totalHsEthStaked, 2) : numberFormat(totalHsUsdbStaked, 2)}
        percent=""
        totalVal={
          isEthSelected ?
              `$${balanceFormatWithPrefix(totalHsEthStaked * ethUsdt)}` :
              `$${balanceFormatWithPrefix(totalHsUsdbStaked * Number(usdbPrice))}`
        }
      />
      <StakeCard
        subLabel={isEthSelected ? "Total hsETH Locked:" : "Total hsUSDB Locked:"}
        value={isEthSelected ? numberFormat(totalHsEthLocked, 2) : numberFormat(totalHsUsdbLocked, 2)}
        percent=""
        totalVal={
          isEthSelected ?
              `$${balanceFormatWithPrefix(totalHsEthLocked * ethUsdt)}` :
              `$${balanceFormatWithPrefix(totalHsUsdbLocked * Number(usdbPrice))}`
      }
      />
    </>
  )
}
