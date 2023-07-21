import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {ITodo} from '../types/types';

interface IInitialState {
  todos: ITodo[];
}

const initialState: IInitialState = {
  todos: [],
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    changeStatusTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map(
        (
          todo, // eslint-disable-line
        ) => (todo.id === action.payload ? {...todo, completed: !todo.completed} : todo),
      );
    },
    reset: () => initialState,
  },
});

export const selectTodo = (state: RootState) => state.todoList;
export const {addTodo, removeTodo, changeStatusTodo, reset} = todoListSlice.actions;
