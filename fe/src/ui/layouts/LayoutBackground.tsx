import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

interface IProps extends FlexProps {}
export default function LayoutBackground({children, ...props}: IProps) {
  return (
    <Flex
      minH="100vh"
      flex={1}
      w="full"
      bgImage="/bg.png"
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
