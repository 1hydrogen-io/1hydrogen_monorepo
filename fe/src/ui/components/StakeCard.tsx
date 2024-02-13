import { Flex, FlexProps, HStack } from '@chakra-ui/react'
import React from 'react'
import SubText from './Text/SubText'
import { MainTitle } from './Text'
import { liner_bg } from '@/themes';

interface IProps   extends FlexProps {
  subLabel: string;
  value: string | number;
  percent?: string;
  totalVal?: string;
}
export default function StakeCard({subLabel, value, percent, totalVal ,...props}:IProps) {
  return (
    <Flex
      p="24px"
      borderRadius="20px"
      bgImage={liner_bg}
      w="222px"
      minH="102px"
      flexDirection="column"
      gap="5px"
      {...props}
    >
      <SubText>{subLabel}</SubText>
      <HStack>
        <MainTitle>{value}</MainTitle>
        {Boolean(percent) && (
          <MainTitle fontSize="14px" color="#01B574">
            {percent}
          </MainTitle>
        )}
      </HStack>
      {Boolean(totalVal) && <SubText>{totalVal}</SubText>}
    </Flex>
  );
}
