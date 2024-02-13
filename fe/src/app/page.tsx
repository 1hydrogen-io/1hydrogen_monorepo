import { MyPoint } from "@/ui/components";
import AppWrapper from "@/ui/components/AppWrapper";
import ButtonTab from "@/ui/components/ButtonTab";
import StakeCard from "@/ui/components/StakeCard";
import SideBarMenu from "@/ui/views/Commons/SideBarMenu";
import StakeContainer from "@/ui/views/Stakes/StakeContainer";
import { Flex } from "@chakra-ui/react";


export default function Home() {
  return (
    <AppWrapper gap="20px">
      <Flex w="full" gap="25px" mt="35px">
        <SideBarMenu />
        <StakeContainer />
        <Flex flexDirection="column" w="full" gap="25px">
          <MyPoint />
          <StakeCard
            subLabel={"Total hsETH Staked:"}
            value={"131290"}
            percent="+55%"
            totalVal="$10M"
          />
          <StakeCard
            subLabel={"Total hsETH Locked:"}
            value={"131290"}
            percent="+55%"
            totalVal="$5M"
          />
        </Flex>
      </Flex>
    </AppWrapper>
  );
}
