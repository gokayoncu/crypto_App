// app/services/index.ts
import axios from 'axios';
import axiosRetry from 'axios-retry';
import rateLimit from 'axios-rate-limit';
import { Coin } from '../types/type';
import { CoinDetails } from '../types/type';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const NEWS_API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

// Configure axios instance with retry and rate limit
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: retryCount => retryCount * 1000,
  retryCondition: error => axios.isAxiosError(error) && error.response?.status === 429,
});

const http = rateLimit(axiosInstance, {
  maxRequests: 30,
  perMilliseconds: 60 * 1000,
  maxRPS: 0.5,
});

// Fetch all coins
export const fetchAllCoins = async (): Promise<Coin[]> => {
  try {
    const response = await http.get('/coins/markets', {
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
    const response = await http.get(`/coins/${id}`);
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
        q: query,
        apiKey: NEWS_API_KEY,
        language: 'en',
        sortBy: 'publishedAt',   //Haberin sıralama ayarı (eski ve yeni olarak)
        pageSize: 50,
      },
    });
    
    return response.data.articles;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching crypto news:', error.message);
      console.error('Response Data:', error.response?.data);
      console.error('Response Status:', error.response?.status);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
