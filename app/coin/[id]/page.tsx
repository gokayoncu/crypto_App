// pages/coin/[id].tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { fetchCoinDetail, fetchCryptoNews } from '@/app/services/index';
import { CoinDetails } from '@/app/types/type';
import PriceChart from '@/app/components/PriceChart';
import Image from 'next/image';
import styles from '@/app/styles/CoinDetail.module.css';

interface CoinDetailPageProps {
  coin: CoinDetails;
  news: any[];
  error?: string;
}

const CoinDetailPage: React.FC<CoinDetailPageProps> = ({ coin, news, error }) => {
  if (error) return <p className={styles.error}>{error}</p>;

  const currentPrice = coin.market_data.current_price.usd;
  const priceChange24h = coin.market_data.price_change_percentage_24h;

  const chartLabels = ['1y', '30d', '7d', '1d'];
  const chartData = [
    currentPrice / (1 + coin.market_data.price_change_percentage_1y / 100), 
    currentPrice / (1 + coin.market_data.price_change_percentage_30d / 100), 
    currentPrice / (1 + coin.market_data.price_change_percentage_7d / 100), 
    currentPrice 
  ];

  return (
    <div className={styles.coinDetail}>
      <h1 className={styles.coinTitle}>
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>
      <Image
        src={coin.image.large || '/default-image.png'}
        alt={coin.name}
        className={styles.coinImage}
        width={100}
        height={100}
      />
      <p className={styles.coinText}>Fiyat: ${currentPrice.toFixed(2)}</p>
      <p className={styles.coinText}>Değişim (24h): {priceChange24h.toFixed(2)}%</p>
      <p className={`${styles.coinText} ${styles.smallText}`}>
        {coin.description.en ? coin.description.en : 'Açıklama mevcut değil.'}
      </p>
      <PriceChart labels={chartLabels} data={chartData} />
      <div className={styles.newsSection}>
        <h2 className={styles.newsTitle}>{coin.name} Latest News</h2>
        {news.length === 0 ? (
          <p className={styles.noData}>No news available.</p>
        ) : (
          <ul className={styles.newsList}>
            {news.map((article, index) => (
              <li key={index} className={styles.newsItem}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <p><small>{new Date(article.publishedAt).toLocaleDateString()}</small></p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Sunucu tarafında verileri çekiyoruz
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    // Coin detaylarını çekiyoruz
    const coin = await fetchCoinDetail(id);

    // Coin haberlerini çekiyoruz
    const news = await fetchCryptoNews(coin.name);

    return {
      props: {
        coin,
        news,
      },
    };
  } catch (error) {
    return {
      props: {
        coin: null,
        news: [],
        error: 'Failed to fetch data',
      },
    };
  }
};

export default CoinDetailPage;
