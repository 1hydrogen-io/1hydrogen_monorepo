import React from 'react'
import { useAppDispatch, useAppSelector } from '../reduxs/hooks'
import { setProcessingAction } from '../reduxs/globals/global.slices';

export default function useProcessing() {
  const dispatch = useAppDispatch();
  const {isProcessing} = useAppSelector(p => p.global)

  const onOpenProcessing = () => {
    dispatch(setProcessingAction(true));
  }

  const onCloseProcessing = () => {
    dispatch(setProcessingAction(false));
  }

  return {
    isProcessing,
    onCloseProcessing,
    onOpenProcessing,
  }
}
