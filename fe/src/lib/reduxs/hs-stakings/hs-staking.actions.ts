import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEthersSigner } from "@/lib/hooks/useEtherSigner";
import { getEthBalance } from "@/lib/utls";
import HsEthStakingContract from "@/lib/contracts/HsEthStakingContract";
import { IPackage, IStakedInfo } from "@/lib/contracts/types";

const default_response = {
  locked: 0,
  totalStaked: 0,
  stakedAmount: 0,
  stakedInfos: [],
}

export const getHsEthStakingInfoAction = createAsyncThunk<{
  locked: number;
  totalStaked: number;
  stakedAmount: number;
  stakedInfos: IStakedInfo[];
}, void>(
  "hs-staking/getHsEthStakingInfoAction",
  async () => {
    try {
      const signer = await getEthersSigner();
      if (!signer) return default_response;
      const address = await signer.getAddress();
      const hsEthStakingContact = new HsEthStakingContract();
      const stakedAmount = await hsEthStakingContact.stakedBalance(address);

      const poolInfor = await hsEthStakingContact.getPoolInfo();
      const stakedInfos = await hsEthStakingContact.getStakedInfo(address);
      return {...poolInfor, stakedAmount, stakedInfos}
    } catch (ex) {
      return default_response
    }
  }
);


export const getPackageAction = createAsyncThunk<IPackage[], void>(
  'hs-staking/getPackageAction',
  async() => {
    const stakingContract = new HsEthStakingContract();
    const rp = await stakingContract.getPackage();
    return rp;
  }
)

