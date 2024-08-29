import React, { useState } from 'react';
import Image from 'next/image';
import { Coin } from '../types/type';
import { useRouter } from 'next/navigation';
import { CiStar } from 'react-icons/ci';
import styles from '../styles/CryptoCard.module.css';

interface CryptoCardProps {
  coin: Coin;
  onAddToWatchlist: (coin: Coin) => void;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ coin, onAddToWatchlist }) => {
  const router = useRouter();
  return (
    <div className={styles.cryptoCard}>
      <Image
        src={coin.image}
        alt={coin.name}
        width={50}
        height={50}
        quality={100}
        className={styles.cryptoCardImage}
      />
      <div className={styles.cryptoCardDetails}>
        <p>{coin.market_cap_rank}.</p>
        <h3 className={styles.cryptoCardName}>{coin.name}</h3>
        <p className={styles.cryptoCardPrice}>Price: ${coin.current_price}</p>
        <p className={styles.cryptoCardChange}>Change: {coin.price_change_percentage_24h}%</p>
        <p>Market Cap: {coin.market_cap} $</p>
        <div className={styles.cryptoCardButtons}>
          <button
            className={styles.cryptoCardButton}
            onClick={() => onAddToWatchlist(coin)}
          >
            <CiStar /> 
          </button>
          <button className={styles.cryptoCardButton} onClick={() => router.push(`/coin/${coin.id}`)}>
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
