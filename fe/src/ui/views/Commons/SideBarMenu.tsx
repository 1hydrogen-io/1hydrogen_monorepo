'use client'
import { getToast } from '@/lib/utls';
import ButtonTab from '@/ui/components/ButtonTab'
import { Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function SideBarMenu() {
  const toast = useToast();
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
        title="hsUSDB"
        active={active === "usdb"}
        onClick={() => toast(getToast('Coming soon', 'warning', 'Oh!'))}
      />
    </Flex>
  );
}
