import React from 'react'
import { IProps } from '.'
import { Text } from '@chakra-ui/react'
import { plus_jakarta_san } from '@/themes'

export default function SubText({ children, ...props}:IProps) {
  return (
    <Text 
    fontFamily={plus_jakarta_san.style.fontFamily}
    fontSize='12px'
    fontWeight='550'
    lineHeight='150%'
    color='#A0AEC0'
    {...props}>{children}</Text>
  )
}
