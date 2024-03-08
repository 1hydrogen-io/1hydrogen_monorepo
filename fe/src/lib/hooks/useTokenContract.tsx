import React, { useCallback, useEffect, useState } from 'react'
import BaseEthContract from '../contracts/BaseEtherContract';
import UsdbContract from "@/lib/contracts/UsdbContract";
import {getEthersSigner} from "@/lib/hooks/useEtherSigner";
import {readContract, writeContract} from "@wagmi/core";
import {CONTRACTS} from "@/lib/constans";
import {toNumberBalance} from "@/lib/contracts/utils/common";
import {BigNumber, ethers} from "ethers";
import {usdbAbi} from "@/lib/contracts/abis/usdb";

export default function useTokenContract() {
  const [ethUsdt, setEthUsdt] = useState<number>(0)
  const [usdbUsdt, setUsdbUsdt] = useState<number>(0)
  const usdbContractAbi = CONTRACTS.usdb.abi;
  const usdbContractAddress = CONTRACTS.usdb.address;
  const getEthPrice = useCallback(async() => {
    try {
      const baseContract = new BaseEthContract();
      const price = await baseContract.getPrice();
      setEthUsdt(price);
    } catch (ex) {}
  }, []);


  const getUsdbPrice = useCallback(async() => {
    try {
      const priceData = await readContract({
        abi: usdbContractAbi,
        address: usdbContractAddress,
        functionName: 'price'
      })
      const price = toNumberBalance(priceData as BigNumber, 8);
      setUsdbUsdt(price)
    } catch (ex) {
      console.log('usdb price', ex)
    }
  }, []);

  const approveUsdbContract = useCallback(async (sender: string, amount: string) => {
    const amountUnit = ethers.utils.parseUnits(amount);
    await writeContract({
      abi: usdbContractAbi,
      address: usdbContractAddress,
      functionName: 'approve',
      args: [sender, amountUnit],
    })
  }, []);

  useEffect(() => {
    getEthPrice();
    getUsdbPrice();
  }, [getEthPrice, getUsdbPrice]);


  return {ethUsdt, usdbUsdt, approveUsdbContract}
}
