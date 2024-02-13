import React from 'react'
import CardCus from '../Commons/CardCus'
import { Flex } from '@chakra-ui/react'
import SubText from '@/ui/components/Text/SubText'
import { LabelValueItem } from '@/ui/components'
import InputCustom from '@/ui/components/InputCustom'
import ButtonCustom from '@/ui/components/ButtonCustom'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import StakePackageContainer from './StakePackageContainer'
import MintButton from './MintButton'

export default function StakeContainer() {
  return (
    <CardCus gap="40px" py="60px">
          <Flex w="full" flexDirection="column">
            <StakePackageContainer />

            <SubText fontSize="12px" mt="12px">
              Multiplier applies to amount of hPoints generated and % of Yield
              each of the pools receives.
            </SubText>
          </Flex>

          <Flex w="full" flexDirection="column" gap="16px">
            <LabelValueItem label="Staked Amount" value="0 $hsETH" />
            <LabelValueItem label="Wallet Balance" value="0 $hsETH" />
          </Flex>

          <Flex w="full" justifyContent="space-between" alignItems="center">
            <InputCustom
              w="348px"
              inputFieldProps={{
                placeholder: "$SFUND Amount",
              }}
            />
            <ButtonCustom>MAX</ButtonCustom>
          </Flex>

          <Flex justifyContent="space-between">
            <LabelValueColumn label="Current APR Rate" value="1%" />
            <LabelValueColumn
              label="Maturity Date"
              value="--"
              justifyContent="center"
              alignItems="center"
            />
            <LabelValueColumn label="Reward Balance" value="--" />
          </Flex>
          <MintButton />
        </CardCus>
  )
}
