// pages/index.tsx
import { GetServerSideProps } from 'next';
import { fetchAllCoins } from '../services/index';
import { Coin } from '../types/type';
import CryptoCard from '../components/CryptoCard';
import Watchlist from '../components/Watchlist';
import { useCryptoContext } from '../context/context';
import styles from '../styles/CryptoCard.module.css';

interface HomeProps {
  coins: Coin[];
}

const Home: React.FC<HomeProps> = ({ coins }) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const coins = await fetchAllCoins();
    return { props: { coins } };
  } catch (error) {
    console.error('Error fetching coins:', error);
    return { props: { coins: [] } };
  }
};

export default Home;
