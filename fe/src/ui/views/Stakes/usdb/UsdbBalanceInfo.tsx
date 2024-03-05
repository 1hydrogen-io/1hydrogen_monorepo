'use client'
import { useAppSelector } from '@/lib/reduxs/hooks';
import { LabelValueItem } from '@/ui/components'
import { Flex, Image } from '@chakra-ui/react'
import React, { useMemo } from 'react'

export default function UsdbBalanceInfo() {
    const {balance} = useAppSelector(p => p.wallet);
    const {stakedAmount, packages, packageSelected} = useAppSelector(p => p.hsStake);


    const stakedAprRate = useMemo(() => {
        if (packages.length < 1) return '0%';
        return packages[Number(packageSelected)].percent + '%';
    }, [packageSelected, packages]);

    return (
        <Flex w="full" flexDirection="column" gap="16px">
            <Flex w='full'>
                <LabelValueItem label="Current APR Rate" value={stakedAprRate} />
                <Image src='/h-point.svg' ml='5px' />
            </Flex>
            <LabelValueItem label="Staked Amount" value={`${stakedAmount} $hsUSDB`} />
            <LabelValueItem label="Wallet Balance" value={`${balance.hsEth} $hsUSDB`} />
        </Flex>
    );
}
