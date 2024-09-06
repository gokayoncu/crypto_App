'use client'; 
import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllCoins } from './services';
import CryptoCard from './components/CryptoCard';
import Watchlist from './components/Watchlist';
import { Coin } from './types/type';
import { useCryptoContext } from './context/context';
import styles from './styles/CryptoCard.module.css';

const Home: React.FC = () => {
  const { data: coins, error, isLoading } = useQuery<Coin[]>('coins', fetchAllCoins);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useCryptoContext();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <div className={styles.container}>
      <Watchlist 
        watchlist={watchlist} 
        removeFromWatchlist={removeFromWatchlist} // Prop olarak geçirin
      />
      <div className={styles.cryptoList}>
        {coins?.map(coin => (
          <CryptoCard key={coin.id} coin={coin} onAddToWatchlist={addToWatchlist} />
        ))}
      </div>      
    </div>
  );
};

export default Home;
