import LabelValueColumn from '@/ui/components/LabelValueColumn'
import { Flex, Image } from '@chakra-ui/react'
import React from 'react'

interface IProps {
  isHideSubLabel?: boolean;
}
export default function StakedLockedAPR({isHideSubLabel}: IProps) {
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
            value={"ZZZZ %"}
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
            value={"ZZZZ - FFFF %"}
            subLabel={isHideSubLabel ? '' : '$XX'} 
            ml='22px'
          />
          </Flex>
      </Flex>
      <Flex w="full" justifyContent="space-between">
        <LabelValueColumn
          subLabel={"hsETH Balance"}
          value={"YYY hsETH"}
          label="$XX"
          labelFontSize="12px"
          subLabelFontSize='10px'
        />
        <LabelValueColumn
          subLabel={"Staked hsETH Balance"}
          value={"YYY hsETH"}
          label="$XX"
          labelFontSize="12px"
          subLabelFontSize='10px'        />
        <LabelValueColumn
          subLabel={"Staked hsETH Balance"}
          value={"YYY hsETH"}
          label="$XX"
          labelFontSize="12px"
          subLabelFontSize='10px'        />
      </Flex>
    </>
  );
}
