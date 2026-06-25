'use client';
import { Provider, } from 'react-redux';
import { useEffect } from 'react';
import { store, useAppDispatch } from './index';
import { tokenLoginUser } from './user';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(tokenLoginUser({ token }));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
