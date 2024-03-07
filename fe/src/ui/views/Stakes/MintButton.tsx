'use client'
import {addPointApi} from '@/lib/apis/account.api';
import HsEthContract from '@/lib/contracts/HsEthContract';
import HsEthStakingContract from '@/lib/contracts/HsEthStakingContract';
import {getEthersSigner} from '@/lib/hooks/useEtherSigner';
import useProcessing from '@/lib/hooks/useProcessing';
import {fetchWalletInfoGlobalAction} from '@/lib/reduxs/globals/global.action';
import {useAppDispatch, useAppSelector} from '@/lib/reduxs/hooks';
import {resetUsdbUserValue, resetUserValue} from '@/lib/reduxs/hs-stakings/hs-staking.slices';
import {getToast} from '@/lib/utls';
import ButtonCustom from '@/ui/components/ButtonCustom'
import {useToast} from '@chakra-ui/react';
import {useConnectModal} from '@rainbow-me/rainbowkit';
import React, {useMemo} from 'react'
import {useAccount} from 'wagmi'
import HsUsdbContract from "@/lib/contracts/HsUsdbContract";
import UsdbVaultContract from "@/lib/contracts/UsdbVaultContract";
import HsUsdbStakingContract from "@/lib/contracts/HsUsdbStakingContract";
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";

export default function MintButton() {
    const toast = useToast();
    const {onOpenProcessing, onCloseProcessing, isProcessing} = useProcessing();
    const dispatch = useAppDispatch();
    const {isConnected} = useAccount();
    const {openConnectModal} = useConnectModal();
    const {packageSelected, hsEthAmount, hsUsdbAmount} = useAppSelector(p => p.hsStake);

    const title = useMemo(() => {
        if (isConnected) return 'STAKE';
        return 'CONNECT YOUR WALLET'
    }, [isConnected]);
    const {globalState: {currentCoin}} = useGlobalState();
    const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

    const stakeEth = async (signer: any, amount: number) => {
        try {
            const hsEthContract = new HsEthContract(signer);
            const hsEthStakingContract = new HsEthStakingContract(signer);
            await hsEthContract.approve(hsEthStakingContract._contractAddress, amount)
            const tx = await hsEthStakingContract.stake(packageSelected, amount);
            try {
                await addPointApi(tx as string);
            } catch {
            }
            await dispatch(fetchWalletInfoGlobalAction()).unwrap();
            toast(getToast(`Stake successfully `, 'success', 'Stake HsEth'))
            dispatch(resetUserValue());
        } catch (ex) {
            toast(getToast('Something went wrong'))
        }
    }

    const stakeUsdb = async (signer: any, amount: number) => {
        try {
            const hsUsdbContract = new HsUsdbContract(signer);
            const hsUsdbStakingContract = new HsUsdbStakingContract(signer);
            await hsUsdbContract.approve(hsUsdbStakingContract._contractAddress, amount)
            const tx = await hsUsdbStakingContract.stake(packageSelected, amount);
            try {
                await addPointApi(tx as string);
            } catch {
            }
            await dispatch(fetchWalletInfoGlobalAction()).unwrap();
            toast(getToast(`Stake successfully `, 'success', 'Stake HsUsdb'))
            dispatch(resetUsdbUserValue());
        } catch (ex) {
            toast(getToast('Something went wrong'))
        }
    }

    const handleClick = async () => {
        if (!isConnected) {
            openConnectModal && openConnectModal();
            return;
        }
        const signer = await getEthersSigner();
        if (!signer) return
        try {

            if (isEthSelected) {
                onOpenProcessing('STAKING_HS_ETH');
                const amount = Number(hsEthAmount);
                if (!amount) {
                    toast(getToast(`Invalid amount`));
                    return;
                }
                stakeEth(signer, amount).then();
            } else {
                onOpenProcessing('STAKING_HS_USDB');
                const amount = Number(hsUsdbAmount);
                if (!amount) {
                    toast(getToast(`Invalid amount`));
                    return;
                }
                stakeUsdb(signer, amount).then()
            }
        } catch (ex) {
            toast(getToast('Something went wrong'))
        }
        onCloseProcessing();
    }

    return (
        <ButtonCustom
            w="full"
            isLoading={isProcessing}
            onClick={handleClick}
        >
            {title}
        </ButtonCustom>
    );
}
