'use client'
import AppWrapper from "@/ui/components/AppWrapper";
import SideBarMenu from "@/ui/views/Commons/SideBarMenu";
import StakeContainer from "@/ui/views/Stakes/eth/StakeContainer";
import StakeInfoContainer from "@/ui/views/Stakes/eth/StakeInfoContainer";
import {Flex} from "@chakra-ui/react";
import ButtonTab from "@/ui/components/ButtonTab";
import React, {useState} from "react";
import UsdbStakeInfoContainer from "@/ui/views/Stakes/usdb/UsdbStakeInfoContainer";
import UsdbStakeContainer from "@/ui/views/Stakes/usdb/UsdbStakeContainer";

const LIST_TAB = [
    {
        title: "hsETH",
        img: "/coins/eth.svg",
    },
    {
        title: "hsUSDB",
        img: "/coins/usdb.svg",
    }
]
export default function Home() {
    const [tabActive, setTabActive] = useState<number>(0);
    const container = () => {
        switch (tabActive) {
            case 0:
                return (
                    <>
                        <StakeContainer/>
                        <StakeInfoContainer/>
                    </>
                )
            case 1:
                return (
                    <>
                        <UsdbStakeContainer/>
                        <UsdbStakeInfoContainer />
                    </>
                )
            default:
                return (
                    <>
                        <StakeContainer/>
                        <StakeInfoContainer/>
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
                                active={index === tabActive}
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
