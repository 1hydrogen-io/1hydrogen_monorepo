import axiosInstance from ".";

export interface IWalletPoint {
  address: string;
  supplyPoint: number;
  stakingPoint: number;
  point: number;
  updatedTime: string;
  latestTx: string;
}



export const addPointApi = async(txHash: string): Promise<IWalletPoint>=> {
  return axiosInstance.post(`wallet/point/${txHash}`);
}

export const getWalletPointApi = async(walletAddress: string): Promise<IWalletPoint> => {
  return axiosInstance.get(`wallet/point/${walletAddress}`);
}

export const getLeaderboardApi = async(): Promise<IWalletPoint[]> => {
  return axiosInstance.get(`wallet/leaderBoard/20`);
}