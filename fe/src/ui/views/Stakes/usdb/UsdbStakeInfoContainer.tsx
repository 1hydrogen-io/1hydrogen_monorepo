import { MyPoint } from '@/ui/components';
import { Flex } from '@chakra-ui/react';
import React from 'react'
import TotalHsEthStakedAndLocked from '../../Commons/eth/TotalHsEthStakedAndLocked';
import TotalHsUsdbStakedAndLocked from "@/ui/views/Commons/usdb/TotalHsUsdbStakedAndLocked";

export default function UsdbStakeInfoContainer() {

    return (
        <Flex flexDirection="column" w="full" gap="25px">
            <MyPoint />
            <TotalHsUsdbStakedAndLocked />
        </Flex>
    );
}
