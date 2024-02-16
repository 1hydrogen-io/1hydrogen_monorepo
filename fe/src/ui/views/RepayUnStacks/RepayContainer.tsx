'use client'
import HsEthContract from '@/lib/contracts/HsEthContract'
import VaultContract from '@/lib/contracts/VaultContract'
import { getEthersSigner } from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import useRefetchBalance from '@/lib/hooks/useRefetchBalance'
import useToastCustom from '@/lib/hooks/useToastCustom'
import { useAppSelector } from '@/lib/reduxs/hooks'
import { numberFormat1 } from '@/lib/utls'
import { subtract } from '@/lib/utls/numberHelper'
import { LabelValueItem } from '@/ui/components'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import { TextCus } from '@/ui/components/Text'
import { Flex } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

export default function RepayContainer() {
  const {isConnected} = useAccount();
  const {vaulStaked} = useAppSelector(p => p.vaul);
  const {isProcessing, onCloseProcessing, onOpenProcessing} = useProcessing();
  const {onErrorToast, onSuccessToast} = useToastCustom();
  const {onRefetch, onReFetchVaul} = useRefetchBalance();
  const [amount, setAmount] = useState<string>('');

  const availableRepay = useMemo(() => {
    return subtract(vaulStaked.stakedBalance, vaulStaked.availableBalance);
  }, [vaulStaked]);

  const isLocked = useMemo(() => {
    if (!isConnected) return true;
    if (availableRepay <= 0) return true;
    return false;
  }, [availableRepay, isConnected]);
  
  const onAmountChange = (val: string) => {
    if (subtract(availableRepay, Number(val)) < 0) return;
    setAmount(val)
  }

  const onSetMax = () => {
    setAmount(availableRepay.toString());
  }

  const onHandleRepay = async()=> {
    const amountNum = Number(amount);
    const signer = await getEthersSigner();
    if (!signer) return;
    if (!amountNum) {
      return onErrorToast('Invalid amount.')
    }
    try {
      onOpenProcessing('REPAY');
      const vaultContract = new VaultContract(signer);
      const hsEthContract = new HsEthContract(signer);
      await hsEthContract.approve(vaultContract._contractAddress, amountNum);
      const tx = await vaultContract.repayHsEthMutation(amountNum);
      setAmount('');
      await onRefetch();
      await onReFetchVaul();
      onSuccessToast('Repay successfully');
    } catch(ex) {
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
      <TextCus mb="10px">Repay hsETH</TextCus>
      <Flex justifyContent="space-between" alignItems="center">
        <InputCustom
          w="342px"
          inputFieldProps={{
            placeholder: "0.0",
            onChange: (e) => onAmountChange(e.target.value),
          }}
          value={amount}
        />
        <ButtonCustom h="48px" onClick={onSetMax}>
          hsETH
        </ButtonCustom>
      </Flex>
      <LabelValueItem
        label={"Total Value to be Repaid for full unlock"}
        value={`${numberFormat1(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH`}
      />

      <LabelValueItem
        label={"Available hsETH"}
        value={`${numberFormat1(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH`}
      />
      <LabelValueItem
        label={"Available ETH"}
        value={numberFormat1(vaulStaked.availableBalance)}
      />
      <LabelValueItem label={"Available USDB"} value={"--- USDB"} />
      <LabelValueItem
        label={"Stake ETH Locked"}
        value={`${numberFormat1(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH`}
      />
      <LabelValueItem label={"Staked ETH UnLocked"} value={"0 ETH"} />
      <ButtonCustom
        w="full"
        onClick={onHandleRepay}
        isLoading={isProcessing}
        disable={!isConnected || isProcessing}
        isLock={isLocked}
      >
        REPAY
      </ButtonCustom>
    </Flex>
  );
}
