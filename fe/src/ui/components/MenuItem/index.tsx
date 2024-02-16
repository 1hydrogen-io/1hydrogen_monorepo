'use client'
import { plus_jakarta_san } from '@/themes';
import { Flex } from '@chakra-ui/react'
import React, { useMemo } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link';


interface IProps {
  lable: string;
  url: string;
}
export default function MenuItem({url, lable}: IProps) {
  const pathname = usePathname();

  const border = useMemo(() => {
    if (pathname !== url) return '';
    return '1px solid white';
  }, [pathname]);
  


  return (
    <Link href={url}>
      <Flex
        color='white'
        fontSize="10px"
        lineHeight='150%'
        fontWeight="800"
        justifyContent='center'
        alignItems='center'
        fontFamily={plus_jakarta_san.style.fontFamily}
        p='10px 16px'
        borderBottom={border}
      >
        {lable}
      </Flex>
    </Link>
  );
}
