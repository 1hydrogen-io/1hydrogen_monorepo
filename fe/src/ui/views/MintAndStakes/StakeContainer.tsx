'use client'
import {addPointApi} from '@/lib/apis/account.api'
import VaultContract from '@/lib/contracts/VaultContract'
import {getEthersSigner} from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import useRefetchBalance from '@/lib/hooks/useRefetchBalance'
import useToastCustom from '@/lib/hooks/useToastCustom'
import {useAppSelector} from '@/lib/reduxs/hooks'
import {isProduction, numberFormat} from '@/lib/utls'
import {subtract} from '@/lib/utls/numberHelper'
import {LabelValueItem} from '@/ui/components'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import {TextCus} from '@/ui/components/Text'
import {Flex} from '@chakra-ui/react'
import React, {useEffect, useMemo, useState} from 'react'
import {useAccount, useContractRead} from 'wagmi'
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";
import {usdbAbi} from "@/lib/contracts/abis/usdb";
import UsdbVaultContract from "@/lib/contracts/UsdbVaultContract";
import useTokenContract from "@/lib/hooks/useTokenContract";

export default function StakeContainer() {
    const {isConnected, address} = useAccount();
    const {balance} = useAppSelector(p => p.wallet);
    const {isProcessing, onCloseProcessing, onOpenProcessing} = useProcessing();
    const {onErrorToast, onSuccessToast} = useToastCustom();
    const {onRefetch, onReFetchVaul, onReFetchUsdbVaul} = useRefetchBalance();
    const {globalState: {currentCoin}} = useGlobalState();
    const {approveUsdbContract} = useTokenContract()
    const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

    const [amount, setAmount] = useState<string>('');

    const onAmountChange = (val: string) => {
        if (subtract(balance.eth, Number(val)) < 0 && isEthSelected) return;
        if (subtract(balance.usdb, Number(val)) < 0 && !isEthSelected) return;
        setAmount(val)
    }

    const ethStakeTx = async (signer: any, amount: any) => {
        const vaulContract = new VaultContract(signer);
        return await vaulContract.stakeMutation(amount);
    }

    const usdbStakeTx = async (signer: any, amount: any) => {
        try {
            const usdbVaultContract = new UsdbVaultContract(signer);
            await approveUsdbContract(usdbVaultContract._contractAddress, amount);
            return await usdbVaultContract.stakeMutation(amount);
        } catch (err) {
            console.log(err, "error in usdbStakeTx")
            throw err;
        }
    }
    const onHandleStake = async () => {
        const amountNum = Number(amount);
        const signer = await getEthersSigner();
        if (!signer) return;
        if (!amountNum) {
            return onErrorToast('Invalid amount.')
        }
        try {
            onOpenProcessing('STAKE');
            const tx = isEthSelected ?
                await ethStakeTx(signer, amount) :
                await usdbStakeTx(signer, amount);
            try {
                const refCode = localStorage.getItem('refCode');
                await addPointApi(tx as string, refCode || '');
            } catch {
            }
            setAmount('');
            await onRefetch();
            await onReFetchVaul();
            await onReFetchUsdbVaul();
            onSuccessToast('Stake successfully');
        } catch (ex) {
            console.log(ex, "error")
            onErrorToast();
        }
        onCloseProcessing();
    }

    useEffect(() => {
        setAmount('')
    }, [currentCoin])

    const isLocked = useMemo(() => {
        if (!isConnected) return true;
        if (!balance.eth && isEthSelected) return true;
        if (!balance.usdb && !isEthSelected) return true;
        return false;
    }, [isConnected, balance, isEthSelected]);


    return (
        <Flex w="full" justifyContent="space-between" flexDirection="column">
            <TextCus mb="10px">
                {
                    isEthSelected ?
                        "Stake ETH and unlock the ability to mint hsETH"
                        : "Stake USDB and unlock the ability to mint hsUSDB"
                }
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
                value={isEthSelected ? `${numberFormat(balance.eth)} ETH` : `${numberFormat(balance.usdb)} USDB`}
                my="16px"
            />
            <ButtonCustom w="full"
                          onClick={onHandleStake}
                          isLoading={isProcessing}
                          disable={!isConnected || isProcessing}
                          isLock={isLocked}
            >STAKE</ButtonCustom>
        </Flex>
    );
}
