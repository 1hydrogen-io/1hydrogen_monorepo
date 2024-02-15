import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import SubText from './Text/SubText'

interface IProps extends FlexProps {
  label: string;
  value: string | number;
  fontSize?: string;
}

export default function LabelValueItem({label, value, fontSize = '14px', ...props}: IProps) {
  return (
    <Flex w="full" justifyContent="space-between" alignItems='center' {...props}>
      <SubText fontSize={fontSize} fontWeight='450'>
        {label}
      </SubText>
      <SubText fontSize={fontSize} fontWeight='550' color='white'>
        {value}
      </SubText>
    </Flex>
  );
}
