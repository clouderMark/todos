import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {todoFormSlice} from './todoFormSlice';
import {todoListSlice} from './todoListSlice';
import {toastSlice} from './toastSlice';
import {sortBySlice} from './sortBySlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['sortBy'],
};

export const rootReducer = combineReducers({
  todoForm: todoFormSlice.reducer,
  todoList: todoListSlice.reducer,
  toast: toastSlice.reducer,
  sortBy: sortBySlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
