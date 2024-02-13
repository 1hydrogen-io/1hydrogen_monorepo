import { LabelValueItem, MyPoint } from '@/ui/components'
import AppWrapper from '@/ui/components/AppWrapper'
import ButtonCustom from '@/ui/components/ButtonCustom'
import ButtonTab from '@/ui/components/ButtonTab'
import InputCustom from '@/ui/components/InputCustom'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import StakeCard from '@/ui/components/StakeCard'
import { TextCus } from '@/ui/components/Text'
import CardCus from '@/ui/views/Commons/CardCus'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function RePayUnStake() {
  return (
    <AppWrapper gap="20px">
      <Flex w="full" gap="25px" mt="35px">
        <Flex gap="8px" flexDirection="column">
          <ButtonTab img="/coins/eth.svg" title="ETH MARKET" active />
          <ButtonTab img="/coins/usdb.svg" title="USDB MARKET" />
        </Flex>

        <CardCus gap="40px">
          <Flex w="full" justifyContent="space-between">
            <LabelValueColumn
              label={"hsETH Balance"}
              value={"YYY hsETH"}
              subLabel="$XX"
              labelFontSize="10px"
            />
            <LabelValueColumn
              label={"Staked hsETH Balance"}
              value={"YYY hsETH"}
              subLabel="$XX"
              labelFontSize="10px"
            />
            <LabelValueColumn
              label={"Staked hsETH Balance"}
              value={"YYY hsETH"}
              subLabel="$XX"
              labelFontSize="10px"
            />
          </Flex>
          <Flex w="full" gap="20px">
            <LabelValueColumn
              flex={1}
              label={"hsETH Staked APR"}
              value={"ZZZZ %"}
              subLabel="$XX"
              labelFontSize="10px"
            />

            <LabelValueColumn
              flex={1}
              label={"hsETH Locked APR"}
              value={"ZZZZ - FFFF %"}
              subLabel="$XX"
              labelFontSize="10px"
            />
          </Flex>

          <Flex w="full" justifyContent="space-between" flexDirection="column">
            <TextCus mb="10px">
              Stake ETH and unlock the ability to mint liqETH
            </TextCus>
            <InputCustom
              isFull
              w="424px"
              inputFieldProps={{
                placeholder: "0.0",
              }}
            />
            <LabelValueItem
              label={"Available amount to stake"}
              value={"X ETH"}
              my="16px"
            />
            <ButtonCustom w="full">STAKE</ButtonCustom>
          </Flex>

          <Flex
            w="full"
            justifyContent="space-between"
            flexDirection="column"
            gap="16px"
          >
            <TextCus mb="10px">Mint hsETH</TextCus>
            <InputCustom
              isFull
              w="424px"
              inputFieldProps={{
                placeholder: "0.0",
              }}
            />
            <LabelValueItem label={"Staked ETH"} value={"X ETH"} />
            <LabelValueItem
              label={"Available amount to mint"}
              value={"X ETH"}
            />
            <LabelValueItem label={"Staked ETH Locked"} value={"X ETH"} />
            <LabelValueItem label={"Minted hsETH"} value={"X ETH"} />
            <ButtonCustom w="full">MINT</ButtonCustom>
          </Flex>
        </CardCus>
        <Flex flexDirection="column" w="full" gap="25px">
          <MyPoint />
          <StakeCard
            subLabel={"Total ETH Staked:"}
            value={"131290"}
            percent="+55%"
            totalVal="$23M"
          />
          <StakeCard
            subLabel={"Total hsETH Staked:"}
            value={"131290"}
            percent="+55%"
            totalVal="$10M"
          />
          <StakeCard
            subLabel={"Total hsETH Locked:"}
            value={"131290"}
            percent="+55%"
            totalVal="$5M"
          />
        </Flex>
      </Flex>
    </AppWrapper>
  );
}
