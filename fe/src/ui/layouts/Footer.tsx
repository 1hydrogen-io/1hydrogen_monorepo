'use client'
import React, { useMemo } from 'react'
import AppWrapper from '../components/AppWrapper'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Flex, Image, VStack } from '@chakra-ui/react'
import {footerData, menus, socialsData} from '@/lib/constans'
import { MainTitle, TextCus } from '../components/Text';
import SubText from '../components/Text/SubText'
import { motion } from 'framer-motion'
import Link from 'next/link'
import MenuItem from '../components/MenuItem'
import { usePathname } from 'next/navigation'

const ImageMotion = motion(Image);

export default function Footer() {

  const pathname = usePathname();
  
  const dataRender = useMemo(() => {
    if (pathname !== '/h-points') return footerData;
    return footerData.filter((p) => !Boolean(p.link));
  }, [pathname]);


  return (
    <>
      <AppWrapper
        justifyContent="center"
        alignItems="center"
        mt="80px"
        mb="40px"
      >
        <MainTitle fontSize="24px" mb="12px">
          Frequently Asked Questions
        </MainTitle>
        {/* <SubText color="white" fontSize="14px" fontWeight="450">
          A lot of people don't appreciate the moment until it’s passed.
        </SubText>
        <SubText color="white" fontSize="14px" fontWeight="450">
          I'm not trying my hardest, and I'm not trying to do
        </SubText> */}
        <Accordion w='full' mt="24px" gap="24px" allowMultiple defaultIndex={0}>
          {dataRender.map((item) => (
            <AccordionItem border="none" key={item.title}>
              {({ isExpanded }) => (
                <Flex w="full" flexDirection="column">
                  <AccordionButton>
                    <Flex w="full" justifyContent="space-between" alignItems='center' pt='10px'>
                      <MainTitle fontSize="16px">{item.title}</MainTitle>
                      <ImageMotion
                        src="/arrow-up.svg"
                        transition="transform 0.8s ease"
                        transform={
                          isExpanded ? "rotate(180deg)" : "rotate(0deg)"
                        }
                      />
                    </Flex>
                  </AccordionButton>
                  <Flex
                    mt="17px"
                    h="1px"
                    w="full"
                    background="linear-gradient(90deg, rgba(224, 225, 226, 0.00) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.16) 99.04%);"
                  />
                  <AccordionPanel>
                    <SubText>{item.des}</SubText>
                    {Boolean(item.link) && <Link href={item.link} target={"_blank"}>
                      <SubText color='white'>
                        {item.link}
                        </SubText>
                    </Link>}
                  </AccordionPanel>
                </Flex>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </AppWrapper>

      <VStack pt="206px" pb="80px" w="full">
        <Flex>
          {menus.map((menu) => (
            <MenuItem key={JSON.stringify(menu)} lable={menu.lable} url={menu.url} />
          ))}
        </Flex>
        <Flex gap="18px" justifyContent="center" mt="21px" mb="27px">
          {socialsData.map((so, index) => (
            <Link href={so.url} target="_blank" key={so.name}>
              <Image src={`/socials/${so.name}.svg`} alt={so.name} />
            </Link>
          ))}
        </Flex>
        <TextCus fontSize="12px">2024, Hydrogen</TextCus>
      </VStack>
    </>
  );
}
