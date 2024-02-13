import React, { useCallback, useEffect, useState } from 'react'
import BaseEthContract from '../contracts/BaseEtherContract';

export default function useBaseEthContract() {
  const [ethUsdt, setPrice] = useState<number>(0)
  const getPrice = useCallback(async() => {
    try {
      const baseContract = new BaseEthContract();
      const price = await baseContract.getPrice();
      setPrice(price);
    } catch (ex) {}
  }, []);

  useEffect(() => {
    getPrice();
  }, [getPrice]);


  return {ethUsdt}
}
