import { Flex, FlexProps, TextProps } from '@chakra-ui/react';
import React from 'react'
import SubText from './Text/SubText';
import { TextCus } from './Text';

interface IProps extends FlexProps {
  label: string;
  value: string;
  subLabel?: string;
  labelFontSize?: string;
  subLabelFontSize?: string;
  labelProps?: TextProps;
  valProps?: TextProps;
  subLabelProps?: TextProps;
}
export default function LabelValueColumn({
  label,
  value,
  subLabel,
  labelFontSize = "14px",
  subLabelFontSize = "12px",
  labelProps,
  valProps,
  subLabelProps,
  ...props
}: IProps) {
  return (
    <Flex flexDirection="column" {...props}>
      <SubText fontSize={labelFontSize} fontWeight="550" {...labelProps}>
        {label}
      </SubText>
      <TextCus fontSize="18px" {...valProps}>{value}</TextCus>
      {Boolean(subLabel) && (
        <SubText fontSize={subLabelFontSize} fontWeight="550" {...subLabelProps}>
          {subLabel}
        </SubText>
      )}
    </Flex>
  );
}
