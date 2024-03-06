'use client'
import useBaseEthContract from '@/lib/hooks/useTokenContract'
import {useAppSelector} from '@/lib/reduxs/hooks'
import {balanceFormatWithPrefix, isProduction} from '@/lib/utls'
import {MyPoint} from '@/ui/components'
import StakeCard from '@/ui/components/StakeCard'
import {Flex} from '@chakra-ui/react'
import React from 'react'
import TotalHsTokenStakedAndLocked from '../Commons/TotalHsTokenStakedAndLocked'
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";
import {useContractRead} from "wagmi";
import {usdbAbi} from "@/lib/contracts/abis/usdb";
import {BigNumber, ethers} from "ethers";

export default function StatMintStakeVaulContainer() {
    const {sTotalStaked, usdbSTotalStaked} = useAppSelector(p => p.vaul);
    const {ethUsdt} = useBaseEthContract();
    useAppSelector(p => p.hsStake);
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
        <Flex flexDirection="column" w="full" gap="25px">
            <MyPoint/>
            <StakeCard
                subLabel={isEthSelected ? "Total ETH Staked:" : "Total USDB Staked:"}
                value={isEthSelected ? sTotalStaked : usdbSTotalStaked}
                percent=""
                totalVal={isEthSelected ?
                    `$${balanceFormatWithPrefix(sTotalStaked * ethUsdt)}` :
                    `$${balanceFormatWithPrefix(usdbSTotalStaked * Number(usdbPrice))}`
                }
            />
            <TotalHsTokenStakedAndLocked/>
        </Flex>
    )
}
