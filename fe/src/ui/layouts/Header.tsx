'use client'
import React, { useEffect, useMemo } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { menus } from "@/lib/constans";
import ConnectWalletButton from "../components/ConnectWalletButton";
import AppWrapper from "../components/AppWrapper";
import MenuItem from "../components/MenuItem";
import Logo from "../components/Logo";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isLanding = useMemo(() => {
    if (pathname === '/landing') return true;
    return false;
  }, [pathname]);  


  return (
    <AppWrapper alignItems="center" justifyContent="center" flexDirection="row">
      <Flex
        w="full"
        h="83px"
        alignItems="center"
        justifyContent="space-between"
        bgImage={isLanding ? '/top-nav-bg.png' : 'unset'}
        bgSize='cover'
        px={isLanding ? '24px' : 'unset'}
        mt={isLanding ? '24px' : 'unset'}
      >
        <Logo />
        <Flex gap="18px">
          {menus.map((menu) => (
            <MenuItem
              url={menu.url}
              lable={menu.lable}
              key={JSON.stringify(menu)}
            />
          ))}
        </Flex>

        <Flex gap="20px" alignItems="center">
          <ConnectWalletButton />
        </Flex>
      </Flex>
    </AppWrapper>
  );
}
