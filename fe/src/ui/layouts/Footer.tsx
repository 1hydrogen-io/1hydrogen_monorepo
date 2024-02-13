'use client'
import React from 'react'
import AppWrapper from '../components/AppWrapper'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Flex, Image } from '@chakra-ui/react'
import { footerData } from '@/lib/constans'
import { MainTitle, TextCus } from '../components/Text';
import SubText from '../components/Text/SubText'
import { motion } from 'framer-motion'

const ImageMotion = motion(Image);

export default function Footer() {
  return (
    <AppWrapper justifyContent="center" alignItems="center" mt="80px" mb="40px">
      <MainTitle fontSize="24px" mb="12px">
        Frequently Asked Questions
      </MainTitle>
      <SubText color="white" fontSize="14px" fontWeight="450">
        A lot of people don't appreciate the moment until it’s passed.
      </SubText>
      <SubText color="white" fontSize="14px" fontWeight="450">
        I'm not trying my hardest, and I'm not trying to do
      </SubText>
      <Accordion mt="48px" gap="24px" allowMultiple defaultIndex={0}>
        {footerData.map((item) => (
          <AccordionItem border="none">
            {({ isExpanded }) => (
              <Flex w="full" flexDirection="column">
                <AccordionButton>
                  <Flex w="full" justifyContent="space-between">
                    <MainTitle fontSize="16px">{item.title}</MainTitle>
                    <ImageMotion 
                      src="/arrow-up.svg"
                       transition= 'transform 0.8s ease'
                       transform= {isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}
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
                </AccordionPanel>
              </Flex>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </AppWrapper>
  );
}
