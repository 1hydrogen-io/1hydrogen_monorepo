'use client'
import HsEthContract from '@/lib/contracts/HsEthContract'
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
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";
import UsdbVaultContract from "@/lib/contracts/UsdbVaultContract";
import HsUsdbContract from "@/lib/contracts/HsUsdbContract";

export default function RepayContainer() {
  const {isConnected} = useAccount();
  const {vaulStaked, usdbVaulStaked} = useAppSelector(p => p.vaul);
  const {isProcessing, onCloseProcessing, onOpenProcessing} = useProcessing();
  const {onErrorToast, onSuccessToast} = useToastCustom();
  const {onRefetch, onReFetchVaul, onReFetchUsdbVaul} = useRefetchBalance();
  const [amount, setAmount] = useState<string>('');
  const {globalState: {currentCoin}} = useGlobalState();
  const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

  const availableRepay = useMemo(() => {
    return subtract(vaulStaked.stakedBalance, vaulStaked.availableBalance);
  }, [vaulStaked]);

  const availableUsdbRepay = useMemo(() => {
    return subtract(usdbVaulStaked.stakedBalance, usdbVaulStaked.availableBalance);
  }, [usdbVaulStaked]);

  const isLocked = useMemo(() => {
    if (!isConnected) return true;
    if (availableRepay <= 0 && isEthSelected) return true;
    if (availableUsdbRepay <= 0 && !isEthSelected) return true;
    return false;
  }, [availableRepay, isConnected]);

  const onAmountChange = (val: string) => {
    if (subtract(availableRepay, Number(val)) < 0 && isEthSelected) return;
    if(subtract(availableUsdbRepay, Number(val)) < 0 && !isEthSelected) return;
    setAmount(val)
  }

  const onSetMax = () => {
    setAmount(isEthSelected ? availableRepay.toString() : availableUsdbRepay.toString());
  }

  const repayEth = async (signer: any, amount: number) => {
    try {
      const vaultContract = new VaultContract(signer);
      const hsEthContract = new HsEthContract(signer);
      await hsEthContract.approve(vaultContract._contractAddress, amount);
      await vaultContract.repayHsEthMutation(amount);
    } catch (e) {
      throw e;
    }
  }

  const repayUsdb = async (signer: any, amount: number) => {
    try {
        const usdbVaultContract = new UsdbVaultContract(signer);
        const hsUsdbContract = new HsUsdbContract(signer);
        await hsUsdbContract.approve(usdbVaultContract._contractAddress, amount);
        await usdbVaultContract.repayHsUsdbMutation(amount);
    } catch (e) {
        throw e;
    }
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
      if(isEthSelected) {
        await repayEth(signer, amountNum);
      } else {
        await repayUsdb(signer, amountNum);
      }
      setAmount('');
      await onRefetch();
      await onReFetchVaul();
      await onReFetchUsdbVaul();
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
      <TextCus mb="10px">{isEthSelected ? "Repay hsETH" : "Repay hsUSDB"}</TextCus>
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
          MAX
        </ButtonCustom>
      </Flex>
      <LabelValueItem
        label={"Total Value to be Repaid for full unlock"}
        value={isEthSelected ? `${numberFormat(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH` : `${numberFormat(
            usdbVaulStaked.stakedBalance - usdbVaulStaked.availableBalance
        )} USDB`}
      />

      <LabelValueItem
        label={isEthSelected ? "Available hsETH" : "Available hsUSDB"}
        value={isEthSelected ? `${numberFormat(
          vaulStaked.availableBalance
        )} ETH` : `${numberFormat(
            usdbVaulStaked.availableBalance
        )} USDB`}
      />
      <LabelValueItem
        label={isEthSelected ? "Available ETH" : "Available USDB"}
        value={isEthSelected ? numberFormat(vaulStaked.availableBalance) : numberFormat(usdbVaulStaked.availableBalance)}
      />
      <LabelValueItem label={"Available USDB"} value={`${numberFormat(usdbVaulStaked.availableBalance)} USDB`} />
      <LabelValueItem
        label={isEthSelected ? "Staked ETH Locked" : "Staked USDB Locked"}
        value={isEthSelected ? `${numberFormat(
          vaulStaked.stakedBalance - vaulStaked.availableBalance
        )} ETH` : `${numberFormat(
            usdbVaulStaked.stakedBalance - usdbVaulStaked.availableBalance
        )} USDB`}
      />
      <LabelValueItem
          label={isEthSelected ? "Staked ETH UnLocked" : "Staked USDB UnLocked"}
          value={isEthSelected ? "0 ETH" : "0 USDB"}
      />
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
