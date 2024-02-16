import {ethers} from 'ethers';

export const subtract = (num1: number, num2: number) => {
  const value1 = ethers.utils.parseEther((num1 || 0).toString());
  const value2 = ethers.utils.parseEther((num2 || 0).toString());
  const result = value1.sub(value2);
  return Number(ethers.utils.formatEther(result));
}