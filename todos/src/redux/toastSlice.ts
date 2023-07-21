import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {RootState} from './store';

interface IInitialState {
  message: string;
  isOpen: boolean;
  statusCode: number | null;
}

const initialState: IInitialState = {
  message: '',
  isOpen: false,
  statusCode: null,
};

type AlertArg = Omit<IInitialState, 'id' | 'isOpen'> & {
  timeout?: number;
};

export const showToast = createAsyncThunk('alert/set', (arg: AlertArg) => {
  const {timeout = 4000} = arg;

  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
});

export const toastSlice = createSlice({
  name: 'toast',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showToast.pending, (state, action) => {
        const {message, statusCode} = action.meta.arg;

        state.message = message;
        state.isOpen = true;
        state.statusCode = statusCode;
      })
      .addCase(showToast.fulfilled, () => initialState);
  },
});

export const selectAlert = (state: RootState) => state.toast;
