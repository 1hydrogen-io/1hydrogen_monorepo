'use client'
import { useAppSelector } from '@/lib/reduxs/hooks';
import { Modal, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

export default function DoNotAccessModal() {
  const {isProcessing} = useAppSelector(p => p.global);
  if (!isProcessing) return null;

  return (
    <Modal closeOnEsc={false} closeOnOverlayClick={false} isOpen={true} size="full" onClose={() => {}}>
      <ModalOverlay bg='transparent' cursor='not-allowed' />
    </Modal>
  );
}