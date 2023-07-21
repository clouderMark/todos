import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {ITodo} from '../types/types';

interface IInitialState {
  todos: {
    message: string;
    id: string;
    completed: boolean;
    draggind: boolean;
  }[];
}

const initialState: IInitialState = {
  todos: [],
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push({...action.payload, draggind: false});
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
    setDraggindTrue: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map(
        (
          todo, // eslint-disable-line
        ) => (todo.id === action.payload ? {...todo, draggind: true} : todo),
      );
    },
    setDraggindFalse: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map(
        (
          todo, // eslint-disable-line
        ) => (todo.id === action.payload ? {...todo, draggind: false} : todo),
      );
    },
    changeItemPlace: (state, action: PayloadAction<string>) => {
      const from = state.todos.findIndex((todo) => todo.draggind);

      const to = state.todos.findIndex((el) => el.id === action.payload);

      state.todos.splice(to, 0, state.todos.splice(from, 1)[0]);
    },
    reset: () => initialState,
  },
});

export const selectTodo = (state: RootState) => state.todoList;
export const {addTodo, removeTodo, changeStatusTodo, setDraggindTrue, setDraggindFalse, changeItemPlace, reset} =
  todoListSlice.actions;
