import { liner_bg } from '@/themes'
import { MainTitle, TextCus } from '@/ui/components/Text'
import SubText from '@/ui/components/Text/SubText'
import { Flex, HStack, Image, Spacer } from '@chakra-ui/react'
import React from 'react'

const data = [
  {title: 'Staking ETH / USDB', value: 'Every 1 ETH worth of assets staked will receive 0.05 points per hour.'},
  {title: 'Staking hsETH / hsUSDB', value: 'Every 1 ETH worth of LSD assets staked will receive 1 point per hour.'},
  {title: 'Locking hsETH / hsUSDB', value: 'Every 1 ETH worth of LSD assets locked will receive a multiplier based on lock duration.'},
]

export default function HowToEarnPoints() {
  return (
    <Flex
      w="full"
      borderRadius="20px"
      background="linear-gradient(163deg, rgba(6, 11, 40, 0.94) 11.89%, rgba(10, 14, 35, 0.49) 99.97%)"
      h="261px"
      p="20px"
      flexDirection="column"
      alignItems="center"
    >
      <HStack w="full" justifyContent="center">
        <MainTitle fontSize="24px">How to earn </MainTitle>
        <Image src="/h-point.svg" />
        <MainTitle fontSize="24px">?</MainTitle>
      </HStack>
      <TextCus fontSize="14px" fontWeight="450" mt="12px">
        You can earn points by supplying, borrowing and LAB staking
      </TextCus>

      <Spacer />

      <Flex w="full" justifyContent="space-between" gap="20px">
        {data.map((d, index) => (
          <Flex
            flex={1}
            key={d.title}
            borderRadius="20"
            p="24px"
            bg={liner_bg}
            flexDirection="row"
            gap="15px"
            alignItems='flex-start'
          >
            <Image src={`/how-to-earns/${index + 1}.svg`} alt={d.title} />
            <Flex flex={1} flexDirection="column">
              <TextCus fontSize="14px">{d.title}</TextCus>
              <SubText fontWeight="450">{d.value}</SubText>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
