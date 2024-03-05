import React from 'react'
import CardCus from '../../Commons/CardCus'
import { Flex } from '@chakra-ui/react'
import SubText from '@/ui/components/Text/SubText'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import StakePackageContainer from '../eth/StakePackageContainer'
import MintButton from '../eth/MintButton'
import InputHsEthStake from '../eth/InputHsEthStake'
import BalanceInfo from '../eth/BalanceInfo'
import LockedPosition from '../eth/LockedPosition'
import UsdbStakePackageContainer from "@/ui/views/Stakes/usdb/UsdbStakePackageContainer";
import UsdbBalanceInfo from "@/ui/views/Stakes/usdb/UsdbBalanceInfo";
import InputHsUsdbStake from "@/ui/views/Stakes/usdb/InputHsUsdbStake";
import UsdbMintButton from "@/ui/views/Stakes/usdb/UsdbMintButton";
import UsdbLockedPosition from "@/ui/views/Stakes/usdb/UsdbLockedPosition";

export default function UsdbStakeContainer() {
    return (
        <CardCus gap="40px" py="60px">
            <Flex w="full" flexDirection="column">
                <UsdbStakePackageContainer />
                <SubText fontSize="12px" mt="12px">
                    Multiplier applies to amount of hPoints generated and % of Yield each
                    of the pools receives.
                </SubText>
            </Flex>
            <UsdbBalanceInfo />
            <InputHsUsdbStake />
            <UsdbMintButton />
            <UsdbLockedPosition />
        </CardCus>
    );
}
