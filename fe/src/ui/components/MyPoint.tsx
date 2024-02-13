import { Flex, FlexProps, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import { MainTitle, TextCus } from './Text'

interface IProps   extends FlexProps {
  point?: number;
}

export default function MyPoint({point = 0,  ...props}: IProps) {
  return (
    <Flex
    fontSize='100px'
    color='red'
    w='222px'
    h='195px'
    bgImage='/my-point-bg.png'
    bgSize='contain'
    bgRepeat='no-repeat'
    bgPosition='center'
    overflow='hidden'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    gap='11px'
    {...props}>
      <MainTitle fontSize='22px' lineHeight='100%'>My Points</MainTitle>
      <MainTitle fontSize='44px' fontWeight='800' lineHeight='100%'>{point}</MainTitle>
      <HStack
        bg='#0F1535'
        w='128px'
        h='26px'
        borderRadius='8px'
        mt='16px'
        justifyContent='center'
        gap='5px'
      >
        <Image src='/lb.svg' />
        <Flex>
          <TextCus>2323/</TextCus>
          <TextCus color='#A0AEC0'>32332</TextCus>
        </Flex>
      </HStack>
    </Flex>
  )
}
