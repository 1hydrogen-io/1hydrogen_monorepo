'use client'
import AppWrapper from '@/ui/components/AppWrapper'
import ButtonTab from '@/ui/components/ButtonTab'
import CardCus from '@/ui/views/Commons/CardCus'
import StakedLockedAPR from '@/ui/views/Commons/eth/StakedLockedAPR'
import MintVaulContainer from '@/ui/views/MintAndStakes/eth/MintVaulContainer'
import StakeContainer from '@/ui/views/MintAndStakes/eth/StakeContainer'
import StatMintStakeVaulContainer from '@/ui/views/MintAndStakes/eth/StatMintStakeVaulContainer'
import {Flex} from '@chakra-ui/react'
import React, {useState} from 'react'
import UsdbStakedLockedAPR from "@/ui/views/Commons/usdb/UsdbStakedLockedAPR";
import UsdbStakeContainer from "@/ui/views/MintAndStakes/usdb/UsdbStakeContainer";
import UsdbMintVaultContainer from "@/ui/views/MintAndStakes/usdb/UsdbMintVaultContainer";
import UsdbStatMintStakeVaulContainer from "@/ui/views/MintAndStakes/usdb/UsdbStatMintStakeVaulContainer";
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";

const LIST_TAB = [
    {
        title: "ETH MARKET",
        img: "/coins/eth.svg",
        value: "eth"
    },
    {
        title: "USDB MARKET",
        img: "/coins/usdb.svg",
        value: "usdb"
    }
]

export default function RePayUnStake() {
    const {globalState: {currentCoin}, onSetCurrentCoin} = useGlobalState();
    return (
        <AppWrapper gap="20px">
            <Flex w="full" gap="25px" mt="35px">
                <Flex gap="8px" flexDirection="column">
                    {
                        LIST_TAB.map((item, index) => (
                            <ButtonTab
                                key={index}
                                img={item.img}
                                title={item.title}
                                active={currentCoin === item.value}
                                onClick={() => onSetCurrentCoin(item.value as "eth" | "usdb")}
                            />
                        ))
                    }
                </Flex>

                <CardCus gap="40px">
                    <StakedLockedAPR isShowPoint/>
                    <StakeContainer/>
                    <MintVaulContainer/>
                </CardCus>
                <StatMintStakeVaulContainer/>
            </Flex>
        </AppWrapper>
    );
}
