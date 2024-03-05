'use client'
import {MyPoint} from '@/ui/components'
import AppWrapper from '@/ui/components/AppWrapper'
import ButtonTab from '@/ui/components/ButtonTab'
import CardCus from '@/ui/views/Commons/CardCus'
import StakedLockedAPR from '@/ui/views/Commons/eth/StakedLockedAPR'
import RepayContainer from '@/ui/views/RepayUnStacks/eth/RepayContainer'
import UnstackContainer from '@/ui/views/RepayUnStacks/eth/UnstackContainer'
import {Flex} from '@chakra-ui/react'
import React, {useState} from 'react'
import UsdbStakedLockedAPR from "@/ui/views/Commons/usdb/UsdbStakedLockedAPR";
import UsdbUnstakeContainer from "@/ui/views/RepayUnStacks/usdb/UsdbUnstakeContainer";
import UsdbRepayContainer from "@/ui/views/RepayUnStacks/usdb/UsdbRepayContainer";

const LIST_TAB = [
    {
        title: "ETH MARKET",
        img: "/coins/eth.svg",
    },
    {
        title: "USDB MARKET",
        img: "/coins/usdb.svg",
    }
]
export default function RePayUnStake() {
    const [tabActive, setTabActive] = useState(0);
    const container = () => {
        switch (tabActive) {
            case 0:
                return (
                    <>
                        <CardCus gap="40px">
                            <StakedLockedAPR isShowPoint/>
                            <UnstackContainer/>
                            <RepayContainer/>
                        </CardCus>
                        <Flex flexDirection="column" w="full" gap="25px">
                            <MyPoint/>
                        </Flex>
                    </>
                )
            case 1:
                return (
                    <>
                        <CardCus gap="40px">
                            <UsdbStakedLockedAPR isShowPoint/>
                            <UsdbUnstakeContainer/>
                            <UsdbRepayContainer/>
                        </CardCus>
                        <Flex flexDirection="column" w="full" gap="25px">
                            <MyPoint/>
                        </Flex>
                    </>
                )
            default:
                return (
                    <>
                        <CardCus gap="40px">
                            <StakedLockedAPR isShowPoint/>
                            <UnstackContainer/>
                            <RepayContainer/>
                        </CardCus>
                        <Flex flexDirection="column" w="full" gap="25px">
                            <MyPoint/>
                        </Flex>
                    </>
                )
        }
    }
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
                                active={tabActive === index}
                                onClick={() => setTabActive(index)}
                            />
                        ))
                    }
                </Flex>
                {container()}
            </Flex>
        </AppWrapper>
    );
}
