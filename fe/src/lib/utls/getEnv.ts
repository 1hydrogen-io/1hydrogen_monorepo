export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) { return 97;}
  return parseInt(env);
}

export const getApiEndpoint = (): string =>{
  return process.env.NEXT_PUBLIC_API_ENDPOINT || '';
}

export const getRPC = () => {
  return ''
}

export const getBaseRPC = () => {
  return 'https://go.getblock.io/d87f48410c844ae2b536597ac2cbb749'
}

export const getBscScanUrl = () => {
  return process.env.NEXT_PUBLIC_BSC_SCAN;
}


export const isProduction = () => {
  const env = process.env.NEXT_PUBLIC_ENV;
  return env === "PRO";
};