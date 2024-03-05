import AppWrapper from "@/ui/components/AppWrapper";
import SideBarMenu from "@/ui/views/Commons/SideBarMenu";
import StakeContainer from "@/ui/views/Stakes/eth/StakeContainer";
import StakeInfoContainer from "@/ui/views/Stakes/eth/StakeInfoContainer";
import { Flex } from "@chakra-ui/react";


export default function Home() {
 
  return (
    <AppWrapper gap="20px">
      <Flex w="full" gap="25px" mt="35px">
        <SideBarMenu />
        <StakeContainer />
        <StakeInfoContainer />
      </Flex>
    </AppWrapper>
  );
}
