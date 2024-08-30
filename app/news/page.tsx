'use client'; 
import React, { useEffect, useState } from 'react';
import { fetchCryptoNews } from '@/app/services/index';
import styles from '@/app/styles/NewsList.module.css'; // CSS modülünü içe aktarın

const CryptoNews: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await fetchCryptoNews('crypto'); // Anahtar kelime olarak 'cryptocurrency'
        setNews(data);
      } catch (error) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.newsList}>
      <h2>Crypto News</h2>
      <ul>
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
    </div>
  );
};

export default CryptoNews;