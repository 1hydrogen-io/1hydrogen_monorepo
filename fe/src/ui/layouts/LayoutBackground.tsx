'use client'
import { Flex, FlexProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'


interface IProps extends FlexProps {}

export default function LayoutBackground({children, ...props}: IProps) {
  
  const pathname = usePathname()
  const getBackgroundImage = useMemo(() => {
    if (pathname === '/landing') return '/bg-1.png';
    return '/bg.png';
  }, [pathname]);  

  return (
    <Flex
      minH="100vh"
      flex={1}
      w="full"
      background='linear-gradient(159deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%);'
      bgImage={getBackgroundImage}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="top center"
      flexDirection="column"
      {...props}
    >
      {children}
    </Flex>
  );
}
