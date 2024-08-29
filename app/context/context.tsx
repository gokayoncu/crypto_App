// app/context/context.tsx
'use client'; // İstemci tarafı bileşenlerinde kullanılacak

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Coin } from '../types/type';

interface CryptoContextType {
  watchlist: Coin[];
  addToWatchlist: (coin: Coin) => void;
  removeFromWatchlist: (coinId: string) => void;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Coin[]>([]);

  const addToWatchlist = (coin: Coin) => {
    if (!watchlist.some(item => item.id === coin.id)) {
      setWatchlist([...watchlist, coin]);
    }
  };

  const removeFromWatchlist = (coinId: string) => {
    setWatchlist(watchlist.filter(coin => coin.id !== coinId));
  };

  return (
    <CryptoContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCryptoContext must be used within a CryptoProvider');
  }
  return context;
};
