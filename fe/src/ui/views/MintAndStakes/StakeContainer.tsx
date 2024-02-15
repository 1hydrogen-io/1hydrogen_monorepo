'use client'
import VaultContract from '@/lib/contracts/VaultContract'
import { getEthersSigner } from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import useRefetchBalance from '@/lib/hooks/useRefetchBalance'
import useToastCustom from '@/lib/hooks/useToastCustom'
import { useAppSelector } from '@/lib/reduxs/hooks'
import { balanceFormat, numberFormat, numberFormat1 } from '@/lib/utls'
import { LabelValueItem } from '@/ui/components'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import { TextCus } from '@/ui/components/Text'
import { Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAccount } from 'wagmi'

export default function StakeContainer() {
  const {isConnected} = useAccount();
  const {balance} = useAppSelector(p => p.wallet);
  const {isProcessing, onCloseProcessing, onOpenProcessing} = useProcessing();
  const {onErrorToast, onSuccessToast} = useToastCustom();
  const {onRefetch, onReFetchVaul} = useRefetchBalance();

  const [amount, setAmount] = useState<string>('');
  
  const onAmountChange = (val: string) => {
    if ((balance.eth - Number(val) ) <= 0) return;
    setAmount(val)
  }

  const onHandleStake = async()=> {
    const amountNum = Number(amount);
    const signer = await getEthersSigner();
    if (!signer) return;
    if (!amountNum) {
      return onErrorToast('Invalid amount.')
    }
    try {
      onOpenProcessing();
      const vaultContract = new VaultContract(signer);
      const tx = await vaultContract.stakeMutation(amountNum);
      setAmount('');
      await onRefetch();
      await onReFetchVaul();
      onSuccessToast('Stake successfully');
    } catch(ex) {
      onErrorToast();
    }
    onCloseProcessing();
  }


  return (
    <Flex w="full" justifyContent="space-between" flexDirection="column">
      <TextCus mb="10px">
        Stake ETH and unlock the ability to mint liqETH
      </TextCus>
      <InputCustom
        isFull
        w="424px"
        inputFieldProps={{
          placeholder: "0.0",
          onChange: (e) => onAmountChange(e.target.value),
        }}
        value={amount}
      />
      <LabelValueItem
        label={"Available amount to stake"}
        value={`${numberFormat(balance.eth)} ETH`}
        my="16px"
      />
      <ButtonCustom w="full" 
        onClick={onHandleStake}
        isLoading={isProcessing}
        disable={!isConnected || isProcessing}
      >STAKE</ButtonCustom>
    </Flex>
  );
}
