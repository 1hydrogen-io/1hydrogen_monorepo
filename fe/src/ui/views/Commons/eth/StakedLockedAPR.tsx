'use client'
import useBaseEthContract from '@/lib/hooks/useBaseEthContract';
import { useAppSelector } from '@/lib/reduxs/hooks';
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import { Flex, Image } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";

interface IProps {
  isShow?: boolean;
  isShowPoint?: boolean;
}
export default function StakedLockedAPR({isShow, isShowPoint}: IProps) {
  const {packages, stakedAmount, lockedHsETHBalance} = useAppSelector(p => p.hsStake);
  const {balance} = useAppSelector(p => p.wallet);
  const {ethUsdt} = useBaseEthContract();
  const {globalState: {currentCoin}} = useGlobalState();
  const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

  const stakedAPR = useMemo(() => {
    if (packages.length < 1) return 0;
    return packages[0].percent;
  }, [packages]);

  const lockedAPR = useMemo(() => {
    if (packages.length < 1) return '0 - 0';
    return `${packages[1].percent} - ${packages[3].percent}`;
  }, [packages]);

  return (
    <>
      <Flex w="full" justifyContent="space-between" gap="10px">
        <Flex
          flex={1}
          borderRadius="20px"
          w="208px"
          h="101px"
          bgImage="/staked-card-bg.svg"
          bgRepeat="no-repeat"
          bgPosition="center"
          bgSize="contain"
          // justifyContent="center"
          alignItems="center"
          gap="20px"
          position="relative"
        >
          {isShow && <Image src="/apr-icon.svg" pl="24px" />}
          <LabelValueColumn
            label={isEthSelected ? "hsUSDB Staked APR" : "hsETH Staked APR"}
            labelFontSize="10px"
            value={`${stakedAPR} %`}
            pl={isShow ? "0px" : "24px"}
          />

          {isShowPoint && <Image
            src="/h-point.svg"
            position="absolute"
            right="15px"
            top="24px"
          />}
        </Flex>
        <Flex
          flex={1}
          borderRadius="20px"
          w="208px"
          h="101px"
          bgImage="/staked-card-bg.svg"
          bgRepeat="no-repeat"
          bgPosition="center"
          bgSize="contain"
          alignItems="center"
          position="relative"
        >
          <LabelValueColumn
            label={isEthSelected ? "hsETH Locked APR" : "hsUSDB Locked APR"}
            labelFontSize="10px"
            value={`${lockedAPR} %`}
            ml="22px"
          />

          {isShowPoint && <Image
            src="/h-point.svg"
            position="absolute"
            right="15px"
            top="24px"
          />}
        </Flex>
      </Flex>
      <Flex w="full" justifyContent="space-between">
        <LabelValueColumn
          subLabel={isEthSelected ? "hsETH Balance" : "hsUSDB Balance"}
          value={isEthSelected ? `${balance.hsEth} hsETH` : `${balance.hsUsdb} hsUSDB`}
          label={isEthSelected ? `$${balance.hsEth * ethUsdt}` : `$${balance.hsUsdb * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize="10px"
        />
        <LabelValueColumn
          subLabel={isEthSelected ? "Staked hsETH Balance" : "Staked hsUSDB Balance"}
          value={isEthSelected ? `${stakedAmount} hsETH` : `${stakedAmount} hsUSDB`}
          label={isEthSelected ? `$${stakedAmount * ethUsdt}` : `$${stakedAmount * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize="10px"
        />
        <LabelValueColumn
          subLabel={isEthSelected ? "Locked hsETH Balance" : "Locked hsUSDB Balance"}
          value={isEthSelected ? `${lockedHsETHBalance} hsETH` : `${lockedHsETHBalance} hsUSDB`}
          label={isEthSelected ? `$${lockedHsETHBalance * ethUsdt}` : `$${lockedHsETHBalance * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize="10px"
        />
      </Flex>
    </>
  );
}
