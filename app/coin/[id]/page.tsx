"use client";
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCoinDetail, fetchCryptoNews } from '@/app/services/index';
import { CoinDetails } from '@/app/types/type';
import PriceChart from '@/app/components/PriceChart';
import Image from 'next/image';
import styles from '@/app/styles/CoinDetail.module.css';

const CoinDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [news, setNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  const { data: coin, error, isLoading } = useQuery<CoinDetails>(['coinDetail', id], () => fetchCoinDetail(id), {
    refetchOnWindowFocus: false, // Bu alana yeniden odaklandığında verinin tekrar çekilmesini engeller.
  });
  
  console.log(coin);
  
  // Fetch news for the coin
  useEffect(() => {
    const fetchNews = async () => {
      if (coin) {
        try {
          const data = await fetchCryptoNews(coin.name);
          setNews(data);
        } catch (error) {
          setNewsError('Failed to fetch news');
        } finally {
          setNewsLoading(false);
        }
      }
    };

    fetchNews();
  }, [coin]);

  // Loading
  if (isLoading) return <p className={styles.loading}>Loading...</p>;

  // Error
  if (error) return <p className={styles.error}>Error occurred! Please try again later.</p>;

  // Data not found
  if (!coin) {
    return <p className={styles.noData}>No data found for this coin.</p>;
  }

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
        src={coin.image.large || '/default-image.png'} // Varsayılan bir resim kullan
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
        {newsLoading && <p className={styles.loading}>Loading news...</p>}
        {newsError && <p className={styles.error}>{newsError}</p>}
        {!newsLoading && !newsError && news.length === 0 && <p className={styles.noData}>No news available.</p>}
        {!newsLoading && !newsError && news.length > 0 && (
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

export default CoinDetailPage;
