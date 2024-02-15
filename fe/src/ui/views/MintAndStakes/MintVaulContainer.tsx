'use client'
import VaultContract from '@/lib/contracts/VaultContract'
import { getEthersSigner } from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import useRefetchBalance from '@/lib/hooks/useRefetchBalance'
import useToastCustom from '@/lib/hooks/useToastCustom'
import { useAppSelector } from '@/lib/reduxs/hooks'
import { numberFormat1 } from '@/lib/utls'
import { LabelValueItem } from '@/ui/components'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import { TextCus } from '@/ui/components/Text'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAccount } from 'wagmi'

export default function MintVaulContainer() {
  const {isConnected} = useAccount()
  const {vaulStaked} = useAppSelector(p => p.vaul);
  const {isProcessing, onCloseProcessing, onOpenProcessing} = useProcessing();
  const {onErrorToast, onSuccessToast}=useToastCustom();
  const {onReFetchVaul} = useRefetchBalance();

  const [amount, setAmount] = useState<string>();

  const onHandleAmountChange = (val: string) => {
    const amountNumber = Number(amount);
    if ((vaulStaked.availableBalance - amountNumber) < 0) return;
    setAmount(val);
  }

  const onMint = async() => {
    try {
      const amountNumber = Number(amount);
      if (!amountNumber)
        return onErrorToast('Invalid amount');
      
      const signer = await getEthersSigner();
      if (!signer) return;

      onOpenProcessing();
      const vaulContract = new VaultContract(signer);
      const tx = await vaulContract.claimHsEthMutation(amountNumber);
      await onReFetchVaul();
      setAmount('');
      onSuccessToast('Mint liqETH successfully', 'Success');
    } catch(Ex) {
      console.log(Ex)
      onErrorToast();
    }
    onCloseProcessing();
  }

  return (
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
          onChange: (e) => onHandleAmountChange(e.target.value),
        }}
        value={amount}
      />
      <LabelValueItem
        label={"Staked ETH"}
        value={`${numberFormat1(vaulStaked.stakedBalance)} ETH`}
      />
      <LabelValueItem
        label={"Available amount to mint"}
        value={`${numberFormat1(vaulStaked.availableBalance)} ETH`}
      />
      <LabelValueItem
        label={"Staked ETH Locked"}
        value={`${numberFormat1(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH`}
      />
      <LabelValueItem
        label={"Minted hsETH"}
        value={`${numberFormat1(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH`}
      />
      <ButtonCustom
        w="full"
        isLoading={isProcessing}
        onClick={onMint}
        disable={!isConnected}
      >
        MINT
      </ButtonCustom>
    </Flex>
  );
}
