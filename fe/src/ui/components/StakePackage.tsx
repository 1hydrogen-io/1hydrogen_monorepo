import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import { TextCus } from './Text';

interface IProps extends FlexProps {
  active?: boolean;
  lable: string;
  xLabel: string;
}
export default function StakePackage({active, lable, xLabel ,...props}: IProps) {
  return (
    <Flex
      w="100px"
      h="48px"
      borderRadius="12px"
      justifyContent="center"
      alignItems="center"
      bgColor={active ? "#0075FF" : "transparent"}
      border={`1px solid ${active ? "transparent" : "#C4C4C4"}`}
      position="relative"
      {...props}
    >
      <TextCus color={active ? "white" : "#C4C4C4"}>{lable}</TextCus>

      <Flex position="absolute"
        p="3px 8px" top="-14px" bg="#0F1535"
        borderRadius='full'
        minH='18px'
        border={`1px solid ${active ? '#0075FF' : '#C4C4C4'}`}
      >
        <TextCus>{xLabel}</TextCus>
      </Flex>
    </Flex>
  );
}
