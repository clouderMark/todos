import {configureStore} from '@reduxjs/toolkit';
import {todoFormSlice} from './todoFormSlice';
import {todoListSlice} from './todoListSlice';
import {toastSlice} from './toastSlice';

export const store = configureStore({
  reducer: {
    todoForm: todoFormSlice.reducer,
    todoList: todoListSlice.reducer,
    toast: toastSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
