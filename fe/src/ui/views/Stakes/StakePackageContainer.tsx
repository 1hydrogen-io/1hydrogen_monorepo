'use client'
import StakePackage from '@/ui/components/StakePackage'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react';

const packages = [
  {
    lable: "NO LOCK",
    xLabel: "0,5x",
    value: "NO_LOCK",
  },
  {
    lable: "30 DAYS",
    xLabel: "1x",
    value: "30_DAYS",
  },
  {
    lable: "90 DAYS",
    xLabel: "2x",
    value: "90_DAYS",
  },
  {
    lable: "180 DAYS",
    xLabel: "3x",
    value: "180_DAYS",
  },
];

export default function StakePackageContainer() {
  const [tab,setTab] = useState<string>('NO_LOCK')
  return (
    <Flex w="full" gap="8px">
      {packages.map((p) => (
        <StakePackage
          key={p.value}
          active={p.value === tab}
          lable={p.lable}
          xLabel={p.xLabel}
          cursor='pointer'
          onClick={() => setTab(p.value)}
        />
      ))}
    </Flex>
  );
}
