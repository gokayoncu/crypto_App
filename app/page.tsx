import React from 'react';
import { fetchAllCoins } from './services';  // API çağrısı
import CryptoCard from './components/CryptoCard';
import Watchlist from './components/Watchlist';
import { Coin } from './types/type';
import { useCryptoContext } from './context/context';
import styles from './styles/CryptoCard.module.css';

interface PageProps {
  coins: Coin[];
}

const Home: React.FC<PageProps> = async () => {
  const coins = await fetchAllCoins();  // Server-side veri alımı
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

// SSR ile veri getirme (yalnızca veri getirme)
export async function getServerSideProps() {
  try {
    const coins = await fetchAllCoins();
    return {
      props: {
        coins,
      },
    };
  } catch (error) {
    console.error('Failed to fetch coins:', error);
    return {
      props: {
        coins: [],
      },
    };
  }
}

export default Home;
