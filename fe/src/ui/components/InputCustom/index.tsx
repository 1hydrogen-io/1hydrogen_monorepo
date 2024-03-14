import { plus_jakarta_san } from '@/themes';
import { Flex, FlexProps, Image, NumberInput, NumberInputField, NumberInputFieldProps, NumberInputProps } from '@chakra-ui/react'
import React from 'react'

interface IProps extends NumberInputProps {
  inputFieldProps?: NumberInputFieldProps;
  btnWidth?: string | number;
  btnLabel?: string; 
  btnProps?: FlexProps;
  isFull?: boolean;
};

export default function InputCustom({inputFieldProps, btnLabel, btnProps, isFull, ...props}: IProps) {
  return (
    <Flex h="48px" borderRadius="15px" 
      bgImage={`/inputs/bg-${isFull ? 'full' : '1'}.svg`}>
      <NumberInput
        w="full"
        placeholder={'0'}
        focusBorderColor="transparent"
        position="relative"
        {...props}
      >
        <NumberInputField
          flex={1}
          border="0px"
          color="white"
          fontSize="18px"
          fontWeight="700"
          px='20px'
          pt='10px'
          fontFamily={plus_jakarta_san.style.fontFamily}
          _placeholder={{
            fontSize: '14px',
          }}
          {...inputFieldProps}
        />
      </NumberInput>
    </Flex>
  );
}
