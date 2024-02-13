import { combineReducers } from '@reduxjs/toolkit'
import stakeReducer from './stakings/staking.slices';

const rootReducer = combineReducers({
   stake: stakeReducer,
})

export default rootReducer;