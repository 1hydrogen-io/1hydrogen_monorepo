import LabelValueColumn from '@/ui/components/LabelValueColumn';
import { MainTitle } from '@/ui/components/Text';
import { Flex, Image } from '@chakra-ui/react'
import React from 'react'

const data = [
  ['Reason #1', 'More Yeild', 'Leverage our system with locking $hsETH to receive incredibly high, risk-free yield.'],
  ['Reason #2','First-ever Liquid Staking for All DAPPs','A protocol that goes beyond the claissic use-case, allowing any DAPP to active Liquid Staking for their users.'],
  ['Reason #3','More DeFi','Use $hsETH across multiple different Blast projects boosting your  capital efficiency '],
]

export default function WhyHydrogen() {
  return (
    <Flex
      w="full"
      h="453px"
      borderRadius="20px"
      background="linear-gradient(163deg, rgba(6, 11, 40, 0.94) 11.89%, rgba(10, 14, 35, 0.49) 99.97%)"
      p="24px"
      flexDirection="column"
      alignItems="center"
      gap="24px"
    >
      <MainTitle>Why Hydrogen?</MainTitle>

      <Flex w="full" gap="24px">
        {data.map((d, index) => (
          <Flex flex={1} key={d[0]} flexDirection="column" gap="24px">
            <Image src={`/hydrogens/${index + 1}.png`} alt={d[1]} />
            <LabelValueColumn
              label={d[0]}
              value={d[1]}
              subLabel={d[2]}
              labelFontSize="10px"
              valProps={{
                maxW: '220px'
              }}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
