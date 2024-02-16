import { liner_bg } from '@/themes'
import { MyPoint } from '@/ui/components'
import AppWrapper from '@/ui/components/AppWrapper'
import ButtonCustom from '@/ui/components/ButtonCustom'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import StakeCard from '@/ui/components/StakeCard'
import { MainTitle, TextCus } from '@/ui/components/Text'
import SubText from '@/ui/components/Text/SubText'
import HowToEarnPoints from '@/ui/views/Commons/HowToEarnPoints'
import AvatarCard from '@/ui/views/Points/AvatarCard'
import Leaderboard from '@/ui/views/Points/Leaderboard'
import StatPointContainer from '@/ui/views/Points/StatPointContainer'
import { Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'

export default function HPoints() {
  return (
    <AppWrapper gap="20px" wrapStyle={{ mb: 200, mt: '24px' }}>
      <Flex w="full" flexDirection="row" gap="24px">
        <MyPoint isLager />

        <StatPointContainer />

        <Flex
          flexDirection="column"
          w="222px"
          h="330px"
          borderRadius="20px"
          bg={liner_bg}
          p="24px"
          justifyContent="space-between"
        >
          <Flex w="full" flexDirection="column" gap="24px">
            <LabelValueColumn
              label={"Referral points"}
              value={"323323"}
              labelProps={{ color: "#FFF", fontSize: "12px" }}
              valProps={{ fontSize: "32px" }}
            />

            <Flex gap="11px">
              <Image src="/user-group.svg" />

              <VStack alignItems="flex-start">
                <TextCus color="white" fontSize="18px" fontWeight="550">
                  4
                </TextCus>
                <SubText fontSize="12px">People invited</SubText>
              </VStack>
            </Flex>
            <SubText fontSize="12px" lineHeight="150%">
              You’ll earn 25% of invited users points.
            </SubText>
          </Flex>

          <ButtonCustom w="full">COPY LINK</ButtonCustom>
        </Flex>
      </Flex>

      <HowToEarnPoints />

      <Flex w="full" flexDirection="column" mt="140px">
        <MainTitle fontSize="24px" alignSelf="center">
          Points leaderboard
        </MainTitle>
        <Flex w="full" gap="24px" mt="37px">
          <Flex w="222px" flexDirection="column" gap="24px">
            <AvatarCard />
            <StakeCard
              subLabel={"Daily Snapshot Time"}
              value={"131290"}
              minH="80px"
            />
            <StakeCard subLabel={"Total Days"} value={"131290"} minH="80px" />
          </Flex>
          <Leaderboard />
        </Flex>
      </Flex>
    </AppWrapper>
  );
}
