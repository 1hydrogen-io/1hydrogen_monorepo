import { LabelValueItem, MyPoint } from '@/ui/components'
import AppWrapper from '@/ui/components/AppWrapper'
import ButtonCustom from '@/ui/components/ButtonCustom'
import ButtonTab from '@/ui/components/ButtonTab'
import DropdownCustom from '@/ui/components/DropdownCustom'
import InputCustom from '@/ui/components/InputCustom'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
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
              Repay hsETH and unlock the ability to unstake ETH
            </TextCus>
            {/* <InputCustom
              isFull
              w="424px"
              inputFieldProps={{
                placeholder: "0.0",
              }}
            /> */}
            <DropdownCustom />
            <LabelValueItem
              label={"Available amount to unstake"}
              value={"X ETH"}
              my="16px"
            />
            <ButtonCustom w="full">UNSTAKE</ButtonCustom>
          </Flex>

          <Flex
            w="full"
            justifyContent="space-between"
            flexDirection="column"
            gap="16px"
          >
            <TextCus mb="10px">Repay hsETH</TextCus>
            <Flex justifyContent='space-between' alignItems='center'>
              <InputCustom
                w="342px"
                inputFieldProps={{
                  placeholder: "0.0",
                }}
              />
              <ButtonCustom h='48px'>hsETH</ButtonCustom>
            </Flex>
            <LabelValueItem label={"Total Value to be Repaid for full unlock"} value={"X ETH"} />
            <LabelValueItem
              label={"Available hsETH"}
              value={"X ETH"}
            />
            <LabelValueItem label={"Available ETH"} value={"X ETH"} />
            <LabelValueItem label={"Available USDB"} value={"X USDB"} />
            <LabelValueItem label={"Stake ETH LockedB"} value={"2 ETH"} />
            <LabelValueItem label={"Staked ETH UnLocked"} value={"2 ETH"} />
            <ButtonCustom w="full">REPAY</ButtonCustom>
          </Flex>
        </CardCus>
        <Flex flexDirection="column" w="full" gap="25px">
          <MyPoint />
        </Flex>
      </Flex>
    </AppWrapper>
  );
}
