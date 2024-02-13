import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { menus } from "@/lib/constans";
import ConnectWalletButton from "../components/ConnectWalletButton";
import AppWrapper from "../components/AppWrapper";
import MenuItem from "../components/MenuItem";
import Logo from "../components/Logo";

export default function Header() {
  return (
    <AppWrapper alignItems="center" justifyContent="center" flexDirection="row">
      <Flex w="full" h='83px' alignItems='center' justifyContent='space-between'>
        <Logo />
        <Flex gap='18px'>
        {menus.map((menu) => (
          <MenuItem url={menu.url} lable={menu.lable} key={JSON.stringify(menu)} />
        ))}
        </Flex>

        <Flex gap='20px' alignItems='center'>
          <ConnectWalletButton />
        </Flex>
      </Flex>
    </AppWrapper>
  );
}
