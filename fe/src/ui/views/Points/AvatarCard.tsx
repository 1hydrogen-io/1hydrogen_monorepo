"use client";
import { useAppSelector } from "@/lib/reduxs/hooks";
import { LabelValueItem } from "@/ui/components";
import { MainTitle } from "@/ui/components/Text";
import { Flex, FlexProps, Image, Spacer, VStack } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {}
export default function AvatarCard({ ...props }: IProps) {
  const { totalUserActive } = useAppSelector((p) => p.global);
  return (
    <Flex
      w="222px"
      h="238px"
      flexDirection="column"
      bgImage="/avatar-bg.png"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="contain"
      borderRadius="20px"
      p="24px"
      {...props}
    >
      <Image src="/avatar.svg" w="50px" h="50px" />
      <Spacer />

      <VStack alignItems="flex-start">
        <MainTitle fontSize="16px">{totalUserActive}</MainTitle>
        <LabelValueItem
          label={"Total active users"}
          value={"--%"}
          fontSize="12px"
        />
      </VStack>
    </Flex>
  );
}
