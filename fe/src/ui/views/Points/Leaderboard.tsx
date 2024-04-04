"use client";
import { IWalletPoint, getLeaderboardApi } from "@/lib/apis/account.api";
import { setTotalUserActiveAction } from "@/lib/reduxs/globals/global.slices";
import { useAppDispatch } from "@/lib/reduxs/hooks";
import { numberFormat, showSortAddress } from "@/lib/utls";
import { TextCus } from "@/ui/components/Text";
import SubText from "@/ui/components/Text/SubText";
import { Flex, Image } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

export default function Leaderboard() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IWalletPoint[]>([]);
  const [totalUser, setTotalUser] = useState<number>(0);

  const onFetchLeaderboard = useCallback(async () => {
    try {
      const rs = await getLeaderboardApi();
      setData(rs.leaderboard);
      setTotalUser(rs.totalUser);
      dispatch(setTotalUserActiveAction(rs.totalUser || 0));
    } catch (ex) {
      setData([]);
    }
  }, []);

  useEffect(() => {
    onFetchLeaderboard();
  }, []);

  return (
    <Flex
      w="full"
      borderRadius="20px"
      p="24px"
      minH="100px"
      flexDirection="column"
      background="linear-gradient(163deg, rgba(6, 11, 40, 0.94) 11.89%, rgba(10, 14, 35, 0.49) 99.97%);"
    >
      <Flex justifyContent="space-between" mb="15px">
        <Flex flex={1}>
          <SubText fontSize="10px">RANK</SubText>
        </Flex>
        <Flex flex={1}>
          <SubText fontSize="10px">ADDRESS</SubText>
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          <SubText fontSize="10px">TOTAL</SubText>
        </Flex>
      </Flex>
      {data.map((lead, index) => (
        <Flex
          justifyContent="space-between"
          py="22px"
          key={index}
          borderTop="1px solid #56577A"
        >
          <Flex flex={1} gap="5px" alignItems="center">
            <TextCus fontSize="14px" fontWeight="550">
              {index + 1}
            </TextCus>
            <Image src="/leaderboard.svg" />
          </Flex>
          <Flex flex={1}>
            <TextCus fontSize="14px" fontWeight="550">
              {showSortAddress(lead.address)}
            </TextCus>
          </Flex>
          <Flex flex={1} justifyContent="flex-end">
            <TextCus fontSize="14px" fontWeight="550">
              {numberFormat(lead.point)}
            </TextCus>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
