'use client'
import VaultContract from '@/lib/contracts/VaultContract'
import {getEthersSigner} from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import useRefetchBalance from '@/lib/hooks/useRefetchBalance'
import useToastCustom from '@/lib/hooks/useToastCustom'
import {useAppSelector} from '@/lib/reduxs/hooks'
import {numberFormat} from '@/lib/utls'
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

export default function UnstackContainer() {
    const {isConnected} = useAccount();
    const {vaulStaked, usdbVaulStaked} = useAppSelector(p => p.vaul);
    const {isProcessing, onCloseProcessing, onOpenProcessing} = useProcessing();
    const {onErrorToast, onSuccessToast} = useToastCustom();
    const {onRefetch, onReFetchVaul, onReFetchUsdbVaul} = useRefetchBalance();
    const [amount, setAmount] = useState<string>('');
    const {globalState: {currentCoin}} = useGlobalState();
    const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

    const isLocked = useMemo(() => {
        if (!isConnected) return true;
        if (!vaulStaked.availableBalance && isEthSelected) return true;
        if (!usdbVaulStaked.availableBalance && !isEthSelected) return true;
        return false;
    }, [isConnected, vaulStaked]);

    useEffect(() => {
        setAmount('')
    }, [currentCoin]);
    const onAmountChange = (val: string) => {
        if (subtract(vaulStaked.availableBalance, Number(val)) < 0 && isEthSelected) return;
        if (subtract(usdbVaulStaked.availableBalance, Number(val)) < 0 && !isEthSelected) return;
        setAmount(val)
    }

    const unStakeEth = async (signer: any, amount: number) => {
        try {
            const vaulContract = new VaultContract(signer);
            const tx = await vaulContract.unStakeMutation(amount);
            onSuccessToast('UnStake ETH successfully', 'Success');
        } catch (Ex) {
            throw Ex;
        }
    }

    const unStakeUsdb = async (signer: any, amount: number) => {
        try {
            const vaulContract = new UsdbVaultContract(signer);
            const tx = await vaulContract.unStakeMutation(amount);
            onSuccessToast('UnStake USDB successfully', 'Success');
        } catch (Ex) {
            throw Ex;
        }
    }

    const onHandleUnStake = async () => {
        const amountNum = Number(amount);
        const signer = await getEthersSigner();
        if (!signer) return;
        if (!amountNum) {
            return onErrorToast('Invalid amount.')
        }
        try {
            onOpenProcessing('UNSTAKE');
            if (isEthSelected) {
                await unStakeEth(signer, amountNum);
                await onReFetchVaul();
            } else {
                await unStakeUsdb(signer, amountNum);
                await onReFetchUsdbVaul();
            }
            setAmount('');
            await onRefetch();
            onSuccessToast('UnStake successfully');
        } catch (ex) {
            onErrorToast();
        }
        onCloseProcessing();
    }

    return (
        <Flex w="full" justifyContent="space-between" flexDirection="column">
            <TextCus mb="10px">
                {isEthSelected ?
                    "Repay hsETH and unlock the ability to unstake ETH" :
                    "Repay hsUSDB and unlock the ability to unstake USDB"
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
                label={"Available amount to unstake"}
                value={
                    isEthSelected ?
                        `${numberFormat(vaulStaked.availableBalance)} ETH` :
                        `${numberFormat(usdbVaulStaked.availableBalance)} USDB`
                }
                my="16px"
            />
            <ButtonCustom w="full"
                          onClick={onHandleUnStake}
                          isLoading={isProcessing}
                          disable={!isConnected || isProcessing}
                          isLock={isLocked}
            >UNSTAKE</ButtonCustom>
        </Flex>
    );
}
