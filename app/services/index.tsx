// app/services/index.ts
import axios from 'axios';
import { Coin } from '../types/type';
import { CoinDetails } from '../types/type';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

// Fetch all coins
export const fetchAllCoins = async (): Promise<Coin[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all coins:', error);
    throw error;
  }
};

// Fetch coin details
export const fetchCoinDetail = async (id: string): Promise<CoinDetails> => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coin detail:', error);
    throw error;
  }
};

// Fetch crypto news with query
export const fetchCryptoNews = async (query: string): Promise<any> => {
  try {
    const response = await axios.get(`${NEWS_API_URL}`, {
      params: {
        q: query, // Anahtar kelime olarak spesifik bir kripto para adı
        apiKey: NEWS_API_KEY,
        language: 'en', // İngilizce haberler
        sortBy: 'publishedAt', // Yayınlanma tarihine göre sıralama
        pageSize: 10, // Sayfa başına haber sayısı
      },
    });
    return response.data.articles; // Haberlerin listesi
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    throw error; // Burada hata daha detaylı işlenebilir
  }
};
