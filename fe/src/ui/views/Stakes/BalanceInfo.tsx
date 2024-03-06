'use client'
import {useAppSelector} from '@/lib/reduxs/hooks';
import {LabelValueItem} from '@/ui/components'
import {Flex, Image} from '@chakra-ui/react'
import React, {useMemo} from 'react'
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";

export default function BalanceInfo() {
    const {balance} = useAppSelector(p => p.wallet);
    const {
        stakedAmount,
        usdbStakedAmount,
        usdbPackages,
        usdbPackageSelected,
        packages,
        packageSelected
    } = useAppSelector(p => p.hsStake);
    const {globalState: {currentCoin}} = useGlobalState();
    const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

    const stakedAprRate = useMemo(() => {
        if (packages.length < 1) return '0%';
        return packages[Number(packageSelected)].percent + '%';
    }, [packageSelected, packages]);

    const usdbStakedAprRate = useMemo(() => {
        if (usdbPackages.length < 1) return '0%';
        return usdbPackages[Number(usdbPackageSelected)].percent + '%';
    }, [usdbPackageSelected, usdbPackages]);

    return (
        <Flex w="full" flexDirection="column" gap="16px">
            <Flex w='full'>
                <LabelValueItem
                    label="Current APR Rate"
                    value={isEthSelected ? stakedAprRate : usdbStakedAprRate}
                />
                <Image src='/h-point.svg' ml='5px'/>
            </Flex>
            <LabelValueItem
                label="Staked Amount"
                value={isEthSelected ? `${stakedAmount} $hsETH` : `${usdbStakedAmount} $hsUsdb`}/>
            <LabelValueItem
                label="Wallet Balance"
                value={isEthSelected ? `${balance.hsEth} $hsETH` : `${balance.hsUsdb} $hsUsdb`}
            />
        </Flex>
    );
}
