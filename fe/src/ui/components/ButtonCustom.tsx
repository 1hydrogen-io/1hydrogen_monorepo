import { plus_jakarta_san } from '@/themes'
import { Button, ButtonProps, Spinner } from '@chakra-ui/react'
import React from 'react'

interface IProps extends ButtonProps {
  isProcessing?: boolean;
  disable?: boolean;
}
export default function ButtonCustom({children, isProcessing, disable, ...props}:IProps) {
  return (
    <Button 
    bgColor='#0075FF'
    borderRadius='12px'
    color='white'
    fontFamily={plus_jakarta_san.style.fontFamily}
    fontSize='10px'
    fontWeight='800'
    p='10.5px 22px'
    _hover={{bgColor: '#0F1535', border: '1px solid #0075FF70'}}
    isDisabled={isProcessing || disable}
    {...props}>
      {isProcessing && <Spinner size='xl' />}
      {children}</Button>
  )
}
