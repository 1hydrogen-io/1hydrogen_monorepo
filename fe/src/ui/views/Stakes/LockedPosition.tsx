'use client'
import HsEthStakingContract from '@/lib/contracts/HsEthStakingContract'
import {IStakedInfo} from '@/lib/contracts/types'
import {getEthersSigner} from '@/lib/hooks/useEtherSigner'
import useProcessing from '@/lib/hooks/useProcessing'
import {fetchWalletInfoGlobalAction} from '@/lib/reduxs/globals/global.action'
import {useAppDispatch, useAppSelector} from '@/lib/reduxs/hooks'
import {getDays, getToast, isDateAfter, numberFormat1} from '@/lib/utls'
import ButtonCustom from '@/ui/components/ButtonCustom'
import LabelValueColumn from '@/ui/components/LabelValueColumn'
import {MainTitle} from '@/ui/components/Text'
import {Flex, Image, VStack, useDisclosure, useToast} from '@chakra-ui/react'
import React, {useMemo, useState} from 'react'
import {useAccount} from 'wagmi'
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";
import HsUsdbStakingContract from "@/lib/contracts/HsUsdbStakingContract";

export default function LockedPosition() {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const {isConnected} = useAccount();
    const {stakedInfos, usdbStakedInfos} = useAppSelector(p => p.hsStake);
    const {onCloseProcessing, onOpenProcessing, isProcessing} = useProcessing();
    const [selectedIndex, setIndex] = useState<number>();
    const {globalState: {currentCoin}} = useGlobalState();
    const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);

    const onHandleUnStake = async (staked: IStakedInfo) => {
        try {
            const signer = await getEthersSigner();
            if (!signer) return;
            onOpenProcessing();
            setIndex(staked.index);
            const stakingContract =
                isEthSelected ? new HsEthStakingContract(signer) :
                    new HsUsdbStakingContract(signer);
            const tx = await stakingContract.unState(staked.index);
            toast(getToast('UnStake successfully', 'success', 'Un Stake'));
            await dispatch(fetchWalletInfoGlobalAction());

        } catch (ex) {
            toast(getToast('Something went wrong'))
        }
        onCloseProcessing()
    }

    if (
        !isConnected ||
        (stakedInfos.length < 1 && isEthSelected) ||
        (usdbStakedInfos.length < 1 && !isEthSelected)
    ) return null;

    return (
        <Flex w="full" flexDirection="column">
            <MainTitle mb="24px">Locked Positions</MainTitle>
            <VStack w="full" alignItems="flex-start" m="0px" gap="12px">
                {(isEthSelected ? stakedInfos : usdbStakedInfos).map((lock, index) => (
                    <Flex w="full" key={index} justifyContent="space-between">
                        <LabelValueColumn
                            label={"Locked Balance"}
                            value={lock.amount}
                            labelFontSize="10px"
                        />
                        <LabelValueColumn
                            label={"Maturity Days Left"}
                            value={getDays(lock.releaseDate, '--')}
                            labelFontSize="10px"
                        />
                        <LabelValueColumn
                            label={"Reward Balance"}
                            value={numberFormat1(lock.rewardDebt)}
                            labelFontSize="10px"
                        />
                        <ButtonCustom
                            disable={isDateAfter(lock.releaseDate)}
                            gap='4px'
                            w='94px'
                            onClick={() => onHandleUnStake(lock)}
                            isLoading={isProcessing && selectedIndex === lock.index}
                        >
                            {isDateAfter(lock.releaseDate) && <Image src='/lock.svg'/>}
                            UNSTAKE
                        </ButtonCustom>
                    </Flex>
                ))}
            </VStack>
        </Flex>
    );
}
