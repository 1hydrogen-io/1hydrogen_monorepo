import { Flex, FlexProps, Image } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { TextCus } from './Text';

interface IProps extends FlexProps {
  img: string;
  title: string;
  active?: boolean;
}
export default function ButtonTab({img, title, active, ...props}: IProps) {
  const bg = useMemo(() => {
    if (active) return '#0075FF';
    return 'transparent';
  }, [active]);
  return (
    <Flex
      w="222px"
      h="35px"
      gap="5px"
      justifyContent="center"
      alignItems="center"
      cursor='pointer'
      borderRadius='12px'
      bgColor={bg}
      backdropFilter='blur(60px)'
      _hover={{
        bgColor: '#0075FF'
      }}
      {...props}
    >
      <Image src={img} />
      <TextCus>{title}</TextCus>
    </Flex>
  );
}
