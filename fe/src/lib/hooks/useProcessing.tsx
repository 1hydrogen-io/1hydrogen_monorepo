import React from 'react'
import { useAppDispatch } from '../reduxs/hooks'
import { setProcessingAction } from '../reduxs/globals/global.slices';

export default function useProcessing() {
  const dispatch = useAppDispatch();

  const onOpenProcessing = () => {
    dispatch(setProcessingAction(true));
  }

  const onCloseProcessing = () => {
    dispatch(setProcessingAction(false));
  }

  return {
    onCloseProcessing,
    onOpenProcessing,
  }
}
