export interface MyContextType {
  state: string;
  setState: (value: string) => void;
}

export interface CryptoContextType {
  watchlist: Coin[];
  addToWatchlist: (coin: Coin) => void;
  removeFromWatchlist: (coinId: string) => void;
}

export interface Coin {
  id: string;
  market_cap_rank?: number; // Opsiyonel ve number türünde
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap?: string; // Opsiyonel ve string türünde
}


export interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1y: number;
    low_24h: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
}



export interface CoinDetailProps {
  params: {
    id: string;
  };
}