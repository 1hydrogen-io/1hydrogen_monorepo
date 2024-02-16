import { useAppDispatch, useAppSelector } from '../reduxs/hooks'
import { setProcessNameAction, setProcessingAction } from '../reduxs/globals/global.slices';
import { useMemo, useRef } from 'react';

type ProcessName =
  | "MINT"
  | "STAKE"
  | "UNSTAKE"
  | "REPAY"
  | "STAKING_HS_ETH"
  | "GLOBAL";

export default function useProcessing() {
  const dispatch = useAppDispatch();
  const preProcessName = useRef<string>();
  const {isProcessing: isProcessingReducer, processName} = useAppSelector(p => p.global)

  const onOpenProcessing = (processName: ProcessName = 'GLOBAL') => {
    preProcessName.current = processName;
    dispatch(setProcessingAction(true));
    dispatch(setProcessNameAction(processName));
  }

  const onCloseProcessing = () => {
    dispatch(setProcessingAction(false));
  }

  const isProcessing = useMemo(() => {
      if (!preProcessName.current) return false;
      return isProcessingReducer && preProcessName.current === processName;
  }, [isProcessingReducer, processName, preProcessName]);

  return {
    isProcessing,
    onCloseProcessing,
    onOpenProcessing,
  }
}
