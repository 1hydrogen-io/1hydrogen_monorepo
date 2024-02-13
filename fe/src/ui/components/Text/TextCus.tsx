import React from 'react'
import { IProps } from '.'
import { Text } from '@chakra-ui/react'
import { plus_jakarta_san } from '@/themes'

export default function TextCus({ children, ...props}:IProps) {
  return (
    <Text 
    fontFamily={plus_jakarta_san.style.fontFamily}
    fontSize='10px'
    fontWeight='800'
    lineHeight='150%'
    color='white'
    {...props}>{children}</Text>
  )
}
