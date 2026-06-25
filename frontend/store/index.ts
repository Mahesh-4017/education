'use client';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
