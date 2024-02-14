'use client'
import { useAppDispatch, useAppSelector } from '@/lib/reduxs/hooks';
import { setPackageAction } from '@/lib/reduxs/hs-stakings/hs-staking.slices';
import { PackageType } from '@/lib/reduxs/hs-stakings/hs-staking.type';
import StakePackage from '@/ui/components/StakePackage'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react';

const packages = [
  {
    lable: "NO LOCK",
    xLabel: "0,5x",
    value: "0",
  },
  {
    lable: "30 DAYS",
    xLabel: "1x",
    value: "1",
  },
  {
    lable: "90 DAYS",
    xLabel: "2x",
    value: "2",
  },
  {
    lable: "180 DAYS",
    xLabel: "3x",
    value: "3",
  },
];

export default function StakePackageContainer() {
  const dispatch = useAppDispatch();
  const {packageSelected} = useAppSelector(p => p.hsStake);

  return (
    <Flex w="full" gap="8px">
      {packages.map((p) => (
        <StakePackage
          key={p.value}
          active={p.value === packageSelected}
          lable={p.lable}
          xLabel={p.xLabel}
          cursor='pointer'
          onClick={() => dispatch(setPackageAction(p.value as PackageType ))}
        />
      ))}
    </Flex>
  );
}
