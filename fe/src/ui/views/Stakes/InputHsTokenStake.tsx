'use client'
import {useAppDispatch, useAppSelector} from '@/lib/reduxs/hooks'
import {setHsEthAmountAction, setHsUsdbAmountAction} from '@/lib/reduxs/hs-stakings/hs-staking.slices'
import {subtract} from '@/lib/utls/numberHelper'
import ButtonCustom from '@/ui/components/ButtonCustom'
import InputCustom from '@/ui/components/InputCustom'
import {Flex} from '@chakra-ui/react'
import React, {useMemo} from 'react'
import {useGlobalState} from "@/lib/reduxs/globals/global.hook";

export default function InputHsTokenStake() {
    const dispatch = useAppDispatch();
    const {hsEthAmount, hsUsdbAmount} = useAppSelector(p => p.hsStake);
    const {balance} = useAppSelector(p => p.wallet);
    const {globalState: {currentCoin}} = useGlobalState();
    const isEthSelected = useMemo(() => currentCoin === "eth", [currentCoin]);
    const handleChange = (val: string) => {
        const amount = Number(val);
        if (isEthSelected) {
            if (subtract(balance.hsEth, amount) < 0) return;
            dispatch(setHsEthAmountAction(val));
        } else {
            if (subtract(balance.hsUsdb, amount) < 0) return;
            dispatch(setHsUsdbAmountAction(val));
        }
    }

    const onSetMax = () => {
        if (isEthSelected) {
            dispatch(setHsEthAmountAction(balance.hsEth.toString()));
        } else {
            dispatch(setHsUsdbAmountAction(balance.hsUsdb.toString()));
        }
    }

    return (
        <Flex w="full" justifyContent="space-between" alignItems="center">
            <InputCustom
                w="348px"
                inputFieldProps={{
                    placeholder: "$SFUND Amount",
                    onChange: (e) => handleChange(e.target.value),
                }}
                value={isEthSelected ? hsEthAmount : hsUsdbAmount}
            />
            <ButtonCustom onClick={onSetMax}>MAX</ButtonCustom>
        </Flex>
    );
}
