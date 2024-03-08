'use client'
import AppWrapper from "@/ui/components/AppWrapper";
import StakeContainer from "@/ui/views/Stakes/StakeContainer";
import StakeInfoContainer from "@/ui/views/Stakes/StakeInfoContainer";
import {Flex} from "@chakra-ui/react";
import ButtonTab from "@/ui/components/ButtonTab";
import React, {useState} from "react";
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";

const LIST_TAB = [
    {
        title: "hsETH",
        img: "/coins/eth.svg",
        value: "eth"
    },
    {
        title: "hsUSDB",
        img: "/coins/usdb.svg",
        value: "usdb"
    }
]
export default function Home() {
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
                <StakeContainer/>
                <StakeInfoContainer/>
            </Flex>
        </AppWrapper>
    );
}
