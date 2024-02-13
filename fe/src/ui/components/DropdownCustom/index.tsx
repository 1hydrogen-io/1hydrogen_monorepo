import { plus_jakarta_san } from '@/themes';
import { Button, Flex, FlexProps, Image, Menu, MenuButton, MenuItem, MenuList, NumberInput, NumberInputField, NumberInputFieldProps, NumberInputProps } from '@chakra-ui/react'
import React from 'react'
import { TextCus } from '../Text';

interface IProps extends NumberInputProps {
  inputFieldProps?: NumberInputFieldProps;
  btnWidth?: string | number;
  btnLabel?: string; 
  btnProps?: FlexProps;
};

export default function DropdownCustom({inputFieldProps, btnLabel, btnProps, ...props}: IProps) {
  return (
    <Flex w='424px' h="48px" borderRadius="15px" bgImage={`/inputs/bg-full.svg`}>
      <Menu>
        <MenuButton
          as={Button}
          w="full"
          bgColor="transparent"
          color="white"
          _hover={{ bgColor: "transparent" }}
          _active={{ bgColor: "transparent" }}
          fontSize='14px'
          fontFamily={plus_jakarta_san.style.fontFamily}
          mt='5px'
        >
          Actions
        </MenuButton>
        <MenuList w="424px" bgColor='rgba(0,0,0,1)' border='1px solid #0075FF70'>
          <MenuItem w="full" bgColor='transparent' mb='10px'>
            <TextCus fontSize='14px'>Create a Cop</TextCus>
          </MenuItem>
          <MenuItem w="full" bgColor='transparent'>
            <TextCus fontSize='14px'>Create a Cop</TextCus>
          </MenuItem>
          <MenuItem w="full" bgColor='transparent'>
            <TextCus fontSize='14px'>Create a Cop</TextCus>
          </MenuItem>
         
        </MenuList>
      </Menu>
    </Flex>
  );
}
