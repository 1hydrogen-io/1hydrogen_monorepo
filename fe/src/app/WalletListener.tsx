"use client";
import { getWalletPointApi, signMessageWallet } from "@/lib/apis/account.api";
import useProcessing from "@/lib/hooks/useProcessing";
import useRefetchBalance from "@/lib/hooks/useRefetchBalance";
import useToastCustom from "@/lib/hooks/useToastCustom";
import { fetchWalletInfoGlobalAction } from "@/lib/reduxs/globals/global.action";
import { useGlobalState } from "@/lib/reduxs/globals/global.hook";
import { useAppDispatch, useAppSelector } from "@/lib/reduxs/hooks";
import {
  getPackageAction,
  getUsdbPackageAction,
} from "@/lib/reduxs/hs-stakings/hs-staking.actions";
import { useCallback, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";

export default function WalletListener() {
  const {
    globalState: { joinCode },
    onSetJoinCode,
  } = useGlobalState();

  const { signMessageAsync } = useSignMessage();

  const { isConnected, address } = useAccount();
  const { onOpenProcessing, onCloseProcessing } = useProcessing();
  const {
    onFetchVaulStakedInfo,
    onFetchSTotalStaked,
    onFetchUsdbVaulStakedInfo,
    onFetchUsdbSTotalStaked,
    onRefetchWalletPointAndCode,
  } = useRefetchBalance();

  const dispatch = useAppDispatch();
  const { onSuccessToast, onErrorToast } = useToastCustom();

  const signMessageWithJoinCode = async () => {
    try {
      if (!isConnected || !address) {
        return;
      }
      const yourPoint = await getWalletPointApi(address);
      if (!Boolean(joinCode) && Boolean(yourPoint.referralCode)) {
        return;
      }

      const message = JSON.stringify({
        wallet: address,
        joinCode,
      });

      const result = await signMessageAsync({
        message,
      });

      if (result) {
        await signMessageWallet(address as string, joinCode, result);
        onSuccessToast("Sign message successfully!");
        await onRefetchWalletPointAndCode();
        onSetJoinCode("");
      }
    } catch (error: any) {
      onErrorToast(error?.message || "Failed to sign message!");
    }
  };

  const onListeningChang = useCallback(async () => {
    onOpenProcessing();
    try {
      await signMessageWithJoinCode();

      await dispatch(fetchWalletInfoGlobalAction()).unwrap();

      onFetchVaulStakedInfo();
      onFetchUsdbVaulStakedInfo();
    } catch (ex) {}
    onCloseProcessing();
  }, [isConnected, address]);

  const getPackage = useCallback(async () => {
    dispatch(getPackageAction());
    dispatch(getUsdbPackageAction());
  }, []);

  useEffect(() => {
    onListeningChang();
  }, [onListeningChang]);

  useEffect(() => {
    getPackage();
  }, []);

  useEffect(() => {
    onFetchSTotalStaked();
    onFetchUsdbSTotalStaked();
  }, []);

  return null;
}
