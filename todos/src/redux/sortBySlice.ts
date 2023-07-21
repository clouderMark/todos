import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';

interface IInitialState {
  hash: string[];
  names: string[];
}

const initialState: IInitialState = {
  hash: [],
  names: [],
};

export const sortBySlice = createSlice({
  name: 'sortBy',
  initialState,
  reducers: {
    addHash: (state, action: PayloadAction<string[]>) => {
      state.hash = action.payload;
    },
    setNames: (state, action: PayloadAction<string[]>) => {
      state.names = [...state.hash, ...action.payload];
    },
    reset: () => initialState,
  },
});

export const selectSortBy = (state: RootState) => state.sortBy;
export const {addHash, setNames, reset} = sortBySlice.actions;
