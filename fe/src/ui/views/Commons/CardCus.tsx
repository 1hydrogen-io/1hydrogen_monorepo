import { liner_bg } from '@/themes'
import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

interface IProps extends FlexProps {

}
export default function CardCus({children, ...props}:IProps) {
  return (
    <Flex
      flexDirection="column"
      bgImage={liner_bg}
      p="22px"
      borderRadius="20px"
      w="full"
      maxW="468px"
      minH="400px"
      {...props}
    >
      {children}
    </Flex>
  );
}
