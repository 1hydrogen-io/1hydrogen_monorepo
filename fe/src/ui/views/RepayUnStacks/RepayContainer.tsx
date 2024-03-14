'use client'
import HsEthContract from '@/lib/contracts/HsEthContract'
import VaultContract from '@/lib/contracts/VaultContract'
import {getEthersSigner} from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import useRefetchBalance from '@/lib/hooks/useRefetchBalance'
import useToastCustom from '@/lib/hooks/useToastCustom'
import {useAppSelector} from '@/lib/reduxs/hooks'
import {numberFormat, numberFormat1} from '@/lib/utls'
import {compareNumber, subtract} from '@/lib/utls/numberHelper'
import {LabelValueItem} from '@/ui/components'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import {TextCus} from '@/ui/components/Text'
import {Flex} from '@chakra-ui/react'
import React, {useMemo, useState} from 'react'
import {useAccount} from 'wagmi'
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
        return vaulStaked.stakedBalance - vaulStaked.availableBalance
    }, [vaulStaked]);

    const availableUsdbRepay = useMemo(() => {
        return usdbVaulStaked.stakedBalance - usdbVaulStaked.availableBalance
    }, [usdbVaulStaked]);

    const isLocked = useMemo(() => {
        if (!isConnected) return true;
        if (availableRepay <= 0 && isEthSelected) return true;
        if (availableUsdbRepay <= 0 && !isEthSelected) return true;
        return false;
    }, [availableRepay, isConnected]);

    const onAmountChange = (val: string) => {
        if (compareNumber(availableRepay, Number(val)) && isEthSelected) return;
        if (compareNumber(availableUsdbRepay, Number(val)) && !isEthSelected) return;
        setAmount(val)
    }

    const onSetMax = () => {
        setAmount(isEthSelected ? numberFormat(availableRepay, 7) : numberFormat(availableUsdbRepay, 7));
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
    const onHandleRepay = async () => {
        const amountNum = Number(amount);
        const signer = await getEthersSigner();
        if (!signer) return;
        if (!amountNum) {
            return onErrorToast('Invalid amount.')
        }
        try {
            onOpenProcessing('REPAY');
            if (isEthSelected) {
                await repayEth(signer, amountNum);
                await onReFetchVaul();
            } else {
                await repayUsdb(signer, amountNum);
                await onReFetchUsdbVaul();
            }
            setAmount('');
            await onRefetch();
            onSuccessToast('Repay successfully');
        } catch (ex) {
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
            <TextCus>{isEthSelected ? "Repay hsETH" : "Repay hsUSDB"}</TextCus>
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
                value={isEthSelected ?
                    `${numberFormat(vaulStaked.stakedBalance - vaulStaked.availableBalance, 7)} ETH` :
                    `${numberFormat(usdbVaulStaked.stakedBalance - usdbVaulStaked.availableBalance, 7)} USDB`
                }
            />

            <LabelValueItem
                label={isEthSelected ? "Available hsETH" : "Available hsUSDB"}
                value={isEthSelected ?
                    `${numberFormat(vaulStaked.availableBalance, 7)} ETH` :
                    `${numberFormat(usdbVaulStaked.availableBalance, 7)} USDB`
                }
            />
            <LabelValueItem
                label={isEthSelected ? "Available ETH" : "Available USDB"}
                value={isEthSelected ? numberFormat(vaulStaked.availableBalance, 7) : numberFormat(usdbVaulStaked.availableBalance, 7)}
            />
            <LabelValueItem label={"Available USDB"} value={`${numberFormat(usdbVaulStaked.availableBalance, 7)} USDB`}/>
            <LabelValueItem
                label={isEthSelected ? "Staked ETH Locked" : "Staked USDB Locked"}
                value={isEthSelected ? `${numberFormat(
                    vaulStaked.stakedBalance - vaulStaked.availableBalance, 7
                )} ETH` : `${numberFormat(
                    usdbVaulStaked.stakedBalance - usdbVaulStaked.availableBalance, 7
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
                disable={isProcessing}
                isLock={isLocked}
            >
                REPAY
            </ButtonCustom>
        </Flex>
    );
}
