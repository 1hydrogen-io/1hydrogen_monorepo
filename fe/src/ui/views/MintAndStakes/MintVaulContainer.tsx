'use client'
import VaultContract from '@/lib/contracts/VaultContract'
import {getEthersSigner} from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import useRefetchBalance from '@/lib/hooks/useRefetchBalance'
import useToastCustom from '@/lib/hooks/useToastCustom'
import {useAppSelector} from '@/lib/reduxs/hooks'
import {numberFormat, numberFormat1} from '@/lib/utls'
import {subtract} from '@/lib/utls/numberHelper'
import {LabelValueItem} from '@/ui/components'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import {TextCus} from '@/ui/components/Text'
import {Flex} from '@chakra-ui/react'
import React, {useEffect, useMemo, useState} from 'react'
import {useAccount} from 'wagmi'
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";
import UsdbVaultContract from "@/lib/contracts/UsdbVaultContract";
import {ethers} from "ethers";

export default function MintVaulContainer() {
    const {isConnected} = useAccount()
    const {vaulStaked, usdbVaulStaked} = useAppSelector(p => p.vaul);
    const {isProcessing, onCloseProcessing, onOpenProcessing} = useProcessing();
    const {onErrorToast, onSuccessToast} = useToastCustom();
    const {onReFetchVaul, onReFetchUsdbVaul, onRefetch} = useRefetchBalance();
    const {globalState: {currentCoin}} = useGlobalState();
    const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

    const [amount, setAmount] = useState<string>();

    const onHandleAmountChange = (val: string) => {
        const amountNumber = Number(val);
        if (subtract(vaulStaked.availableBalance, amountNumber) < 0 && isEthSelected) return;
        if (subtract(vaulStaked.stakedBalance, amountNumber) < 0 && isEthSelected) return;
        if (subtract(usdbVaulStaked.availableBalance, amountNumber) < 0 && !isEthSelected) return;
        if (subtract(usdbVaulStaked.stakedBalance, amountNumber) < 0 && !isEthSelected) return;
        setAmount(val);
    }

    useEffect(() => {
        setAmount('')
    }, [currentCoin]);

    const mintEth = async (signer: any, amount: number) => {
        try {
            const vaulContract = new VaultContract(signer);
            const tx = await vaulContract.claimHsEthMutation(amount);
            onSuccessToast('Mint hsETH successfully', 'Success');
        } catch (Ex) {
            throw Ex;
        }
    }

    const mintUsdb = async (signer: any, amount: number) => {
        try {
            const usdbAmountUnit = ethers.utils.parseUnits(amount.toString());
            console.log(usdbAmountUnit)
            const usdbVaultContract = new UsdbVaultContract(signer);
            const tx = await usdbVaultContract.claimHsUsdbMutation(amount);
            onSuccessToast('Mint hsUSDB successfully', 'Success');
        } catch (Ex) {
            throw Ex;
        }
    }

    const onMint = async () => {
        try {
            const amountNumber = Number(amount);
            if (!amountNumber)
                return onErrorToast('Invalid amount');
            const signer = await getEthersSigner();
            if (!signer) return;
            onOpenProcessing('MINT');
            if(isEthSelected) {
                await mintEth(signer, amountNumber);
                await onReFetchVaul();
            } else {
                await mintUsdb(signer, amountNumber);
                await onReFetchUsdbVaul();
            }
            await onRefetch();
            setAmount('');
        } catch (Ex) {
            console.log(Ex)
            onErrorToast();
        }
        onCloseProcessing();
    }

    const isLocked = useMemo(() => {
        if (!isConnected) return true;
        if (vaulStaked.stakedBalance <= 0 && isEthSelected) return true;
        if (vaulStaked.availableBalance <= 0 && isEthSelected) return true;
        if (usdbVaulStaked.stakedBalance <= 0 && !isEthSelected) return true;
        if (usdbVaulStaked.availableBalance <= 0 && !isEthSelected) return true;
        return false;
    }, [isConnected, vaulStaked, usdbVaulStaked]);

    return (
        <Flex
            w="full"
            justifyContent="space-between"
            flexDirection="column"
            gap="16px"
        >
            <TextCus mb="10px">{isEthSelected ? "Mint hsETH" : "Mint hsUSDB"}</TextCus>
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
                label={isEthSelected ? "Staked ETH" : "Staked USDB"}
                value={
                    isEthSelected ?
                        `${numberFormat(vaulStaked.stakedBalance)} ETH` :
                        `${numberFormat(usdbVaulStaked.stakedBalance)} USDB`
                }
            />
            <LabelValueItem
                label={"Available amount to mint"}
                value={
                    isEthSelected ?
                        `${numberFormat(vaulStaked.availableBalance)} ETH` :
                        `${numberFormat(usdbVaulStaked.availableBalance)} USDB`
                }
            />
            <LabelValueItem
                label={isEthSelected ? "Staked ETH Locked" : "Staked USDB Locked"}
                value={
                    isEthSelected ?
                        `${numberFormat(vaulStaked.stakedBalance - vaulStaked.availableBalance)} ETH` :
                        `${numberFormat(usdbVaulStaked.stakedBalance - usdbVaulStaked.availableBalance)} USDB`
                }
            />
            <LabelValueItem
                label={isEthSelected ? "Minted hsETH" : "Minted hsUSDB"}
                value={
                    isEthSelected ?
                        `${numberFormat(vaulStaked.stakedBalance - vaulStaked.availableBalance)} ETH` :
                        `${numberFormat(usdbVaulStaked.stakedBalance - usdbVaulStaked.availableBalance)} USDB`
                }
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
