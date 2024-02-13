import React from 'react'
import { IProps } from '.'
import { Text } from '@chakra-ui/react'
import { plus_jakarta_san } from '@/themes'

export default function Heading({children, ...props}: IProps) {
  return (
    <Text 
      fontSize='18px'
      lineHeight='150%'
      color='white'
      fontWeight='800'
      fontFamily={plus_jakarta_san.style.fontFamily}
    {...props}>{children}</Text>
  )
} 