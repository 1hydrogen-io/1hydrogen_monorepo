'use client'
import ButtonTab from '@/ui/components/ButtonTab'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function SideBarMenu() {
  const [active, setActive] = useState<string>('eth');
  return (
    <Flex gap="8px" flexDirection="column">
      <ButtonTab
        img="/coins/eth.svg"
        title="hsETH"
        active={active === "eth"}
        onClick={() => setActive("eth")}
      />
      <ButtonTab
        img="/coins/usdb.svg"
        title="hsETH"
        active={active === "usdb"}
        onClick={() => setActive("usdb")}
      />
    </Flex>
  );
}
