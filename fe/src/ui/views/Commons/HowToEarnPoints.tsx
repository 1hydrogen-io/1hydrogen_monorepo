import { liner_bg } from '@/themes'
import { MainTitle, TextCus } from '@/ui/components/Text'
import SubText from '@/ui/components/Text/SubText'
import { Flex, Spacer } from '@chakra-ui/react'
import React from 'react'

const data = [
  {title: 'Supplying', value: 'Every $1 worth of assets deposited will receive 0.01 points per day'},
  {title: 'Borrowing', value: 'Every $1 worth of assets borrowed will receive 0.03 points per day'},
  {title: 'Staking', value: 'A total of 3,000 points will be distributed daily based on each xLAB score'},
]

export default function HowToEarnPoints() {
  return (
    <Flex w='full'
      borderRadius='20px'
      bg={liner_bg}
      h='261px'
      p='20px'
      flexDirection='column'
      alignItems='center'
    >
      <MainTitle fontSize='24px'>How to earn points?</MainTitle>
      <TextCus
        fontSize='14px'
        fontWeight='450'
        mt='12px'
      >You can earn points by supplying, borrowing and LAB staking</TextCus>

      <Spacer />

      <Flex w='full' justifyContent='space-between' gap='20px'>
        {data.map((d) => <Flex flex={1} key={d.title}
          borderRadius='20'
          p='24px'
          bg={liner_bg}
          flexDirection='column'
          gap='5px'
        >
            <TextCus fontSize='14px'>{d.title}</TextCus>
            <SubText fontWeight='450'>{d.value}</SubText>

        </Flex>)}

      </Flex>


    </Flex>
  )
}
