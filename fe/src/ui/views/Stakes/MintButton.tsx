'use client'
import { addPointApi } from '@/lib/apis/account.api';
import HsEthContract from '@/lib/contracts/HsEthContract';
import HsEthStakingContract from '@/lib/contracts/HsEthStakingContract';
import { getEthersSigner } from '@/lib/hooks/useEtherSigner';
import useProcessing from '@/lib/hooks/useProcessing';
import { fetchWalletInfoGlobalAction } from '@/lib/reduxs/globals/global.action';
import { useAppDispatch, useAppSelector } from '@/lib/reduxs/hooks';
import { getHsEthStakingInfoAction } from '@/lib/reduxs/hs-stakings/hs-staking.actions';
import { resetUserValue } from '@/lib/reduxs/hs-stakings/hs-staking.slices';
import { getToast } from '@/lib/utls';
import ButtonCustom from '@/ui/components/ButtonCustom'
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useMemo } from 'react'
import { useAccount } from 'wagmi'

export default function MintButton() {
  const toast = useToast();
  const {onOpenProcessing, onCloseProcessing} = useProcessing();
  const dispatch = useAppDispatch();
  const {isConnected} = useAccount();
  const {openConnectModal} = useConnectModal();
  const {isOpen: isLoading, onClose, onOpen} = useDisclosure();

  const {packageSelected, hsEthAmount} = useAppSelector(p => p.hsStake);

  const title = useMemo(() => {
    if (isConnected) return 'STAKE';
    return 'CONNECT YOUR WALLET'
  }, [isConnected]);


  const handleClick = async() => {
    if (!isConnected) {
      openConnectModal && openConnectModal();
      return;
    }
    const signer = await getEthersSigner();
    if (!signer) return;
    const amount = Number(hsEthAmount);
    if (!amount) {
      toast(getToast(`Invalid amount`));
      return;
    }
    onOpenProcessing();
    onOpen();
    try {
      const hsEthContract = new HsEthContract(signer);
      const hsEthStakingContract = new HsEthStakingContract(signer);
      await hsEthContract.approve(hsEthStakingContract._contractAddress, amount)
      const tx = await hsEthStakingContract.stake(packageSelected, amount);
      try {
        await addPointApi(tx as string);
      } catch {}
      await dispatch(fetchWalletInfoGlobalAction()).unwrap();
      toast(getToast(`Stake successfully `, 'success', 'Stake HsEth'))
      dispatch(resetUserValue());
    } catch (ex) {
      toast(getToast('Something went wrong'))
    }
    onCloseProcessing();
    onClose();
  }

  return (
    <ButtonCustom w="full" isLoading={isLoading}
      onClick={handleClick}>
      {title}
    </ButtonCustom>
  );
}
