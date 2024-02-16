'use client'
import { addPointApi } from '@/lib/apis/account.api'
import VaultContract from '@/lib/contracts/VaultContract'
import { getEthersSigner } from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import useRefetchBalance from '@/lib/hooks/useRefetchBalance'
import useToastCustom from '@/lib/hooks/useToastCustom'
import { useAppSelector } from '@/lib/reduxs/hooks'
import { numberFormat, numberFormat1 } from '@/lib/utls'
import { subtract } from '@/lib/utls/numberHelper'
import { LabelValueItem } from '@/ui/components'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import { TextCus } from '@/ui/components/Text'
import { Flex } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

export default function MintVaulContainer() {
  const {isConnected} = useAccount()
  const {vaulStaked} = useAppSelector(p => p.vaul);
  const {isProcessing, onCloseProcessing, onOpenProcessing} = useProcessing();
  const {onErrorToast, onSuccessToast}=useToastCustom();
  const {onReFetchVaul} = useRefetchBalance();

  const [amount, setAmount] = useState<string>();

  const onHandleAmountChange = (val: string) => {
    const amountNumber = Number(val);
    const result = subtract(vaulStaked.availableBalance, amountNumber);
    if (result < 0) return;
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

  const isLocked = useMemo(() => {
    if (!isConnected) return true;
    if (vaulStaked.stakedBalance <= 0) return true;
    if (vaulStaked.availableBalance <= 0) return true;
    return false;
  }, [isConnected, vaulStaked]);

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
        value={`${numberFormat(vaulStaked.stakedBalance)} ETH`}
      />
      <LabelValueItem
        label={"Available amount to mint"}
        value={`${numberFormat(vaulStaked.availableBalance)} ETH`}
      />
      <LabelValueItem
        label={"Staked ETH Locked"}
        value={`${numberFormat(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH`}
      />
      <LabelValueItem
        label={"Minted hsETH"}
        value={`${numberFormat(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH`}
      />
      <ButtonCustom
        w="full"
        isLoading={isProcessing}
        onClick={onMint}
        disable={!isConnected}
        isLock={isLocked}
      >
        MINT
      </ButtonCustom>
    </Flex>
  );
}
