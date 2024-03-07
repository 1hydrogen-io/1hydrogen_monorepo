import React, { useCallback, useEffect, useState } from 'react'
import BaseEthContract from '../contracts/BaseEtherContract';
import UsdbContract from "@/lib/contracts/UsdbContract";
import {readContract} from "@wagmi/core";
import {CONTRACTS} from "@/lib/constans";
import {ethers} from "ethers";

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

  const getUsdbPrice = useCallback(async() => {
    const price = await readContract({
      abi: CONTRACTS.usdb.abi,
        address: CONTRACTS.usdb.address,
        functionName: 'price',
    })
    const usdbUnit = ethers.utils.formatUnits(Number(price), 8);
    const usdbPrice = Number.parseFloat(usdbUnit);
    setUsdbUsdt(usdbPrice);
  }, []);

  useEffect(() => {
    getEthPrice();
    getUsdbPrice();
  }, [getEthPrice, getUsdbPrice]);


  return {ethUsdt, usdbUsdt}
}
