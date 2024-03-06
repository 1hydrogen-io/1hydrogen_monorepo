'use client'
import { useAppDispatch, useAppSelector } from '@/lib/reduxs/hooks';
import {setPackageAction, setUsdbPackageAction} from '@/lib/reduxs/hs-stakings/hs-staking.slices';
import { PackageType } from '@/lib/reduxs/hs-stakings/hs-staking.type';
import StakePackage from '@/ui/components/StakePackage'
import { Flex } from '@chakra-ui/react'
import React, {useMemo} from 'react';
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";

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
  const {packageSelected, usdbPackageSelected} = useAppSelector(p => p.hsStake);
  const {globalState: {currentCoin}} = useGlobalState();
  const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

  return (
    <Flex w="full" gap="8px">
      {packages.map((p) => isEthSelected ? (
        <StakePackage
          key={p.value}
          active={p.value === packageSelected}
          lable={p.lable}
          xLabel={p.xLabel}
          cursor='pointer'
          onClick={() => dispatch(setPackageAction(p.value as PackageType ))}
        />
      ) : (
        <StakePackage
          key={p.value}
          active={p.value === usdbPackageSelected}
          lable={p.lable}
          xLabel={p.xLabel}
          cursor='pointer'
          onClick={() => dispatch(setUsdbPackageAction(p.value as PackageType ))}
        />
      ))}
    </Flex>
  );
}
