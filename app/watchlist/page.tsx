'use client';

import React from 'react';
import { useCryptoContext } from '@/app/context/context';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Coin } from '@/app/types/type';
import styles from '@/app/styles/WatchlistPage.module.css';
import Image from 'next/image';

// Chart.js'i kaydedin
Chart.register(...registerables);

// Grafik için örnek veri
const generateChartData = (prices: number[]) => ({
  labels: prices.map((_, index) => `Day ${index + 1}`),
  datasets: [
    {
      label: 'Price',
      data: prices,
      borderColor: '#42A5F5',
      backgroundColor: 'rgba(66, 165, 245, 0.2)',
    },
  ],
});

const WatchlistPage: React.FC = () => {
  const { watchlist, removeFromWatchlist } = useCryptoContext();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Watchlist</h1>
      <div>
        {watchlist.length === 0 ? (
          <p>No items in your watchlist</p>
        ) : (
          <ul className={styles.watchlist}>
            {watchlist.map((coin: Coin) => {
              // Örnek veri, gerçek veriyle değiştirilmelidir
              const examplePrices = [
                coin.current_price * (1 - 0.05), // 5% düşüş
                coin.current_price * (1 - 0.02), // 2% düşüş
                coin.current_price, // şu anki fiyat
                coin.current_price * (1 + 0.02), // 2% artış
                coin.current_price * (1 + 0.05), // 5% artış
              ];

              return (
                <li
                  key={coin.id}
                  className={styles.watchlistItem}
                >
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={50}
                    height={50}
                    quality={100}
                    className={styles.cryptoCardImage}
                  />
                  <div className={styles.watchlistItemContent}>
                    <h3 className={styles.watchlistItemTitle}>
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </h3>
                    <p className={styles.watchlistItemPrice}>
                      ${coin.current_price.toFixed(2)}
                    </p>
                    <p className={styles.watchlistItemChange}>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                    <div className={styles.chartContainer}>
                      <Line
                        data={generateChartData(examplePrices)}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              display: false,
                            },
                            y: {
                              display: false,
                            },
                          },
                        }} 
                        width={250}  // Grafik genişliği
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromWatchlist(coin.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
