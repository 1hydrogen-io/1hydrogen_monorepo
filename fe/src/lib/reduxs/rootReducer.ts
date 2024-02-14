import { combineReducers } from '@reduxjs/toolkit'
import stakeReducer from './stakings/staking.slices';
import walletReducer from './wallets/wallet.slices';
import hsStakingReducer from './hs-stakings/hs-staking.slices';
import globalReducer from './globals/global.slices';

const rootReducer = combineReducers({
   stake: stakeReducer,
   wallet: walletReducer,
   hsStake: hsStakingReducer,
   global: globalReducer,
})

export default rootReducer;