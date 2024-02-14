'use client'
import { useAppDispatch, useAppSelector } from '@/lib/reduxs/hooks'
import { setHsEthAmountAction } from '@/lib/reduxs/hs-stakings/hs-staking.slices'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function InputHsEthStake() {
  const dispatch = useAppDispatch();
  const {hsEthAmount} = useAppSelector(p => p.hsStake);
  const {balance} = useAppSelector(p => p.wallet);

  const handleChange = (val: string) => {
    dispatch(setHsEthAmountAction(val));
  }
  
  const onSetMax = () => {
    dispatch(setHsEthAmountAction(balance.hsEth.toString()));
  }

  return (
    <Flex w="full" justifyContent="space-between" alignItems="center">
      <InputCustom
        w="348px"
        inputFieldProps={{
          placeholder: "$SFUND Amount",
          onChange: (e) => handleChange(e.target.value),
        }}
        value={hsEthAmount}
      />
      <ButtonCustom onClick={onSetMax}>MAX</ButtonCustom>
    </Flex>
  );
}
