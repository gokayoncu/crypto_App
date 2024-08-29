// app/components/Watchlist.tsx
import React from 'react';
import Image from 'next/image';
import { Coin } from '../types/type';
import styles from '@/app/styles/Watchlist.module.css'; // CSS module import

interface WatchlistProps {
  watchlist: Coin[];
  removeFromWatchlist: (id: string) => void; // Silme işlevi için tip
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, removeFromWatchlist }) => {
  return (
    <div className={styles.watchlist}>
      <h2 className={styles.watchlistTitle}>Watchlist</h2>
      {watchlist.map((coin) => (
        <div key={coin.id} className={styles.watchlistItem}>
          <Image
            src={coin.image}
            alt={coin.name}
            width={50}
            height={50}
            quality={100}
            className={styles.watchlistItemImage} // Sınıf adını ekleyin
          />
          <button
            className={styles.removeButton}
            onClick={() => removeFromWatchlist(coin.id)} // Silme işlevini çağır
          >
            &times;
          </button>
          <h3>{coin.name}</h3>
          <p>Price: ${coin.current_price.toFixed(2)}</p>
          <p>Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
