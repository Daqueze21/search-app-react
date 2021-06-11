import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './Search_Slice';

const rootReducer = combineReducers({
  Search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
