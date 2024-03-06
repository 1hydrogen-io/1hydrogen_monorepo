import React, { useCallback, useEffect, useState } from 'react'
import BaseEthContract from '../contracts/BaseEtherContract';
import UsdbContract from "@/lib/contracts/UsdbContract";

export default function useTokenContract() {
  const [ethUsdt, setEthUsdt] = useState<number>(0)
  const [usdbUsdt, setUsdbUsdt] = useState<number>(0)
  const getEthPrice = useCallback(async() => {
    try {
      const baseContract = new BaseEthContract();
      const price = await baseContract.getPrice();
      setEthUsdt(price);
    } catch (ex) {}
  }, []);

  // const getUsdbPrice = useCallback(async() => {
  //   try {
  //     const usdbContract = new UsdbContract();
  //     const price = await usdbContract.getPrice();
  //     setUsdbUsdt(price);
  //   } catch (ex) {}
  // }, []);

  useEffect(() => {
    getEthPrice();
  }, [getEthPrice]);


  return {ethUsdt}
}
