'use client'
import { useGlobalState } from '@/lib/reduxs/globals/global.hook'
import AppWrapper from '@/ui/components/AppWrapper'
import HowToEarnPoints from '@/ui/views/Commons/HowToEarnPoints'
import HeaderSession from '@/ui/views/Landings/HeaderSession'
import WhyHydrogen from '@/ui/views/Landings/WhyHydrogen'
import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export default function LandingPage() {
  const { onSetJoinCode } = useGlobalState()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const refCode = urlParams.get('ref')
    if (refCode) {
      onSetJoinCode(refCode)
    }
  }, [])
  return (
    <AppWrapper
      gap='50px'
    >
      <HeaderSession />
      <Flex w='full' h='206px'
        bgImage='/task-graph.png'
        bgRepeat='no-repeat'
        bgSize='cover'
        mt='50px'
      />
      <WhyHydrogen />
      <HowToEarnPoints />
    </AppWrapper>
  )
}
