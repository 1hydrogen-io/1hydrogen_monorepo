import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react'
import SubText from './Text/SubText';
import { TextCus } from './Text';

interface IProps extends FlexProps {
  label: string;
  value: string;
  subLabel?: string;
  labelFontSize?: string;
}
export default function LabelValueColumn({label, value, subLabel, 
  labelFontSize = '14px',
  ...props}: IProps) {
  return (
    <Flex flexDirection="column" {...props}>
      <SubText fontSize={labelFontSize} fontWeight="550">
        {label}
      </SubText>
      <TextCus fontSize="18px">{value}</TextCus>
      {Boolean(subLabel) && 
        <SubText fontSize="12px" fontWeight="550">
          {subLabel}
        </SubText>}
    </Flex>
  );
}
