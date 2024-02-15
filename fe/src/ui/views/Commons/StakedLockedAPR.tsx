'use client'
import useBaseEthContract from '@/lib/hooks/useBaseEthContract';
import { useAppSelector } from '@/lib/reduxs/hooks';
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import { Flex, Image } from '@chakra-ui/react'
import React, { useMemo } from 'react'

interface IProps {
  isHideSubLabel?: boolean;
}
export default function StakedLockedAPR({isHideSubLabel}: IProps) {
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
          justifyContent="center"
          alignItems="center"
          gap="20px"
        >
          <Image src="/staked-icon.svg" />
          <LabelValueColumn
            label={"hsETH Staked APR"}
            labelFontSize="10px"
            value={`${stakedAPR} %`}
            subLabel={isHideSubLabel ? '' : '$XX'} 
          />
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
          alignItems='center'
        >
          <LabelValueColumn
            label={"hsETH Locked APR"}
            labelFontSize="10px"
            value={`${lockedAPR} %`}
            subLabel={isHideSubLabel ? '' : '$XX'} 
            ml='22px'
          />
          </Flex>
      </Flex>
      <Flex w="full" justifyContent="space-between">
        <LabelValueColumn
          subLabel={"hsETH Balance"}
          value={`${balance.hsEth} hsETH`}
          label={`$${balance.hsEth * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize='10px'
        />
        <LabelValueColumn
          subLabel={"Staked hsETH Balance"}
          value={`${stakedAmount} hsETH`}
          label={`$${stakedAmount * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize='10px'        />
        <LabelValueColumn
          subLabel={"Locked hsETH Balance"}
          value={`${lockedHsETHBalance} hsETH`}
          label={`$${lockedHsETHBalance * ethUsdt}`}
          labelFontSize="12px"
          subLabelFontSize='10px'/>
      </Flex>
    </>
  );
}
