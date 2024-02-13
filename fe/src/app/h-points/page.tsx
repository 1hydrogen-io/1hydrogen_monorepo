import { MyPoint } from '@/ui/components'
import AppWrapper from '@/ui/components/AppWrapper'
import StakeCard from '@/ui/components/StakeCard'
import { MainTitle } from '@/ui/components/Text'
import AvatarCard from '@/ui/views/Points/AvatarCard'
import Leaderboard from '@/ui/views/Points/Leaderboard'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function HPoints() {
  return (
    <AppWrapper gap="20px" wrapStyle={{mb: 200}}>
      <Flex w="full" flexDirection="column" gap="22px">
        <MyPoint />
        <Flex w="full" gap="24px">
          <StakeCard
            subLabel={"Supply point"}
            value={"131290"}
            percent="+55%"
            minH="80px"
          />
          <StakeCard
            subLabel={"Borrow point"}
            value={"131290"}
            percent="+55%"
            minH="80px"
          />
          <StakeCard
            subLabel={"Borrow point"}
            value={"131290"}
            percent="+55%"
            minH="80px"
          />
          <StakeCard
            subLabel={"Borrow point"}
            value={"131290"}
            percent="+55%"
            minH="80px"
          />
        </Flex>
      </Flex>
      <Flex w='full' flexDirection='column' mt='120px'>
        <MainTitle fontSize='24px'>Points leaderboard</MainTitle>
        <Flex w='full' gap='24px' mt='37px'>
          <Flex w='222px' flexDirection='column' gap='24px'>
            <AvatarCard />
            <StakeCard subLabel={'Daily Snapshot Time'} value={'131290'}
              minH='80px'
            />
            <StakeCard subLabel={'Total Days'} value={'131290'}
              minH='80px'
            />
          </Flex>
          <Leaderboard />
        </Flex>
      </Flex>
    </AppWrapper>
  );
}
