
import { providers, utils } from "ethers";
import { UseToastOptions } from '@chakra-ui/react';
import moment, { isDate } from 'moment';
export * as rem from './remCalc';

const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';
const DATE_TIME_FORMAT_ONE = 'DD/MM/YYYY HH:mm';

export * from './getEnv';

export const convertNumberTextInput = (str?: string) => {
  if (!str) return 0;
  const v = str.split(',').join('');
  return v ? parseFloat(v) : 0;
}

export const showSortAddress = (address: string): string => {
  return `${address?.substr(0, 4)}...${address?.substr(
      address.length - 4,
      address.length - 1
  )}`
}

export const numberFormat1 = (number: number | string) => {
 const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return currencyFormatter.format(Number(number));
}


export const numberFormat = (number: number | string) =>Number(number).toFixed(4);


export const getToast = (description: string, status: UseToastOptions["status"] = 'error', title = 'Error'): UseToastOptions => {
  return { title, status, position: 'top-right', description, duration: 1000 }
}

export const showTransactionHash = (tranHash: string) => {
  return  `${tranHash?.substring(0, 10)}${"".padStart(5, '*')}${tranHash?.substring(tranHash.length -10, tranHash.length)}`    
}

export function formatDate(date: Date) {
  return moment(date).format(DATE_TIME_FORMAT);
}


export const endDate = (date: Date, days: number) => {
 return moment(date).add(days, 'days').format(DATE_TIME_FORMAT);
}

export function isDateAfter(dateNum: number): boolean {
  const currentDate = moment();
  const date = moment.unix(dateNum);  
  return date.isAfter(currentDate);
}

export function getDaysFromCurrent(dateNum: number): string {
  const currentDate = moment();
  const date = moment.unix(dateNum);       
  const duration = moment.duration(date.diff(currentDate));    

  const d = duration.days();
  const h = duration.hours();
  const m = duration.minutes();
  const s = duration.seconds();

  if (d > 0) return `${d} days`;
  if (h > 0) return `${h} hours`;
  if (m > 0) return `${m} minutes`;
  if (s > 0) return `${s} seconds`;
  return '0';
}

export const getDays = (dateNum: number, defaultReturn?: string) => {
  if (!isDateAfter(dateNum)) return defaultReturn || 0;
  const today  = new Date();
  const toDate = new Date(dateNum * 1000);
  const diffTime = Math.abs(toDate.valueOf() - today.valueOf());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
}

export function formatDateYYYYMMDDHHMMSS(date: number) {
  return moment(date * 1000).format(DATE_TIME_FORMAT_ONE)
}

export function parseBalance(balanceWei: number | string, decimals = 18) {
  if (!balanceWei || balanceWei === 0) {
      return 0
  }

  let afterDecimal
  const weiString = balanceWei.toString()
  const trailingZeros = /0+$/u

  const beforeDecimal =
      weiString.length > decimals ? weiString.slice(0, weiString.length - decimals) : '0'
  afterDecimal = ('0'.repeat(decimals) + balanceWei).slice(-decimals).replace(trailingZeros, '')

  if (afterDecimal === '') {
      afterDecimal = '0'
  }

  if (afterDecimal.length > 3) {
      afterDecimal = afterDecimal.slice(0, 3)
  }

  return parseFloat(`${beforeDecimal}.${afterDecimal}`)
}

export const getEthBalance = async(walletAddress: string) => {
  const provider = new providers.JsonRpcProvider('https://rpc.ankr.com/blast_testnet_sepolia');
  const wei = await provider.getBalance(walletAddress);
  const eth = utils.formatEther(wei);
  return Number.parseFloat(eth);
}

export const parseNumber = (val: string) => val.replace(/^\$/, '')

export const balanceFormat = (balance: number) => {
  return numberFormat(balance.toFixed(1))
}

export const balanceFormatWithPrefix = (num: number): string => {
  num = parseFloat(num.toString().replace(/[^0-9.]/g, ''));
  if (num < 1000) {
      return balanceFormat(num);
  }
  const si = [
      { v: 1E3, s: "K" },
      { v: 1E6, s: "M" },
      { v: 1E9, s: "B" },
      { v: 1E12, s: "T" },
      { v: 1E15, s: "P" },
      { v: 1E18, s: "E" }
  ];

  let index: number;
  for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
          break;
      }
  }
  return `${(num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s}`;
};