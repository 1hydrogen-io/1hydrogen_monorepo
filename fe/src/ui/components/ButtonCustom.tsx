import { plus_jakarta_san } from '@/themes'
import { Button, ButtonProps, Image, Spinner } from '@chakra-ui/react'
import React, { useMemo } from 'react'

interface IProps extends ButtonProps {
  isProcessing?: boolean;
  disable?: boolean;
  isLock?: boolean;
}
export default function ButtonCustom({children, isProcessing, disable, isLock, ...props}:IProps) {
  
  const bgColor = useMemo(() => {
    if (isLock || disable) return '#344767';
    return '#0075FF';
  }, [isLock, disable]);
  
  const opacity = useMemo(() => {
    if (isLock || disable) return  0.5;
    return 1;
  }, [isLock, disable]);

  return (
    <Button
      bgColor={bgColor}
      backdropFilter='blur(60px)'
      borderRadius="12px"
      color='white'
      opacity={opacity}
      fontFamily={plus_jakarta_san.style.fontFamily}
      fontSize="10px"
      fontWeight="800"
      p="10.5px 22px"
      gap="5px"
      _hover={{ bgColor: "#0F1535", border: "1px solid #0075FF70" }}
      isDisabled={isProcessing || disable || isLock}
      {...props}
    >
      {isProcessing && <Spinner size="xl" />}
      {isLock && <Image src="/lock-1.svg" />}
      {children}
    </Button>
  );
}
