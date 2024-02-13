import { Image } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href='/'>
      <Image src='/logo.svg' alt='Hydrogen' />
    </Link>
  )
}
