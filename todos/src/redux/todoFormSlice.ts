import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {ITodo} from '../types/types';

const initialState: ITodo = {
  message: '',
  id: '',
  completed: false,
};

export const todoFormSlice = createSlice({
  name: 'todoForm',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setItem: (state, action: PayloadAction<ITodo>) => {
      const el = action.payload;

      state.id = el.id;
      state.message = el.message;
      state.completed = el.completed;
    },
    resetForm: () => initialState,
  },
});

export const selectTodoForm = (state: RootState) => state.todoForm;
export const {setMessage, setItem, resetForm} = todoFormSlice.actions;
