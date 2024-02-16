'use client'
import useBaseEthContract from '@/lib/hooks/useBaseEthContract';
import { useAppSelector } from '@/lib/reduxs/hooks';
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import { Flex, Image } from '@chakra-ui/react'
import React, { useMemo } from 'react'

interface IProps {
  isShow?: boolean;
  isShowPoint?: boolean;
}
export default function StakedLockedAPR({isShow, isShowPoint}: IProps) {
  const {packages, stakedAmount, lockedHsETHBalance} = useAppSelector(p => p.hsStake);
  const {balance} = useAppSelector(p => p.wallet);
  const {ethUsdt} = useBaseEthContract();

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
            label={"hsETH Staked APR"}
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
            label={"hsETH Locked APR"}
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
          subLabel={"hsETH Balance"}
          value={`${balance.hsEth} hsETH`}
          label={`$${balance.hsEth * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize="10px"
        />
        <LabelValueColumn
          subLabel={"Staked hsETH Balance"}
          value={`${stakedAmount} hsETH`}
          label={`$${stakedAmount * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize="10px"
        />
        <LabelValueColumn
          subLabel={"Locked hsETH Balance"}
          value={`${lockedHsETHBalance} hsETH`}
          label={`$${lockedHsETHBalance * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize="10px"
        />
      </Flex>
    </>
  );
}
