import React from 'react';
import { GetStaticProps } from 'next';
import { fetchAllCoins } from './services';
import CryptoCard from './components/CryptoCard';
import Watchlist from './components/Watchlist';
import { Coin } from './types/type';
import { useCryptoContext } from './context/context';
import styles from './styles/CryptoCard.module.css';

const Home: React.FC<{ coins: Coin[] }> = ({ coins }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useCryptoContext();

  return (
    <div className={styles.container}>
      <Watchlist 
        watchlist={watchlist} 
        removeFromWatchlist={removeFromWatchlist} // Prop olarak geçirin
      />
      <div className={styles.cryptoList}>
        {coins.map(coin => (
          <CryptoCard key={coin.id} coin={coin} onAddToWatchlist={addToWatchlist} />
        ))}
      </div>      
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const coins = await fetchAllCoins();
    return {
      props: {
        coins,
      },
      revalidate: 60, // Sayfa verisini her 60 saniyede bir yeniler
    };
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    return {
      props: {
        coins: [],
      },
      revalidate: 60,
    };
  }
};

export default Home;
