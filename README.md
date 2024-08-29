# Cryptocurrency Tracking Application

Live site : https://crypto-k9n0q8uwr-gokayoncus-projects.vercel.app/

## Overview

This project is a web-based application designed to track and manage cryptocurrencies. It provides users with a detailed view of various cryptocurrencies, including their current prices, historical data, and related news. The application leverages the CoinGecko API to fetch cryptocurrency data and includes features to enhance the user experience.

## Features

- **Cryptocurrency List**: Displays a comprehensive list of cryptocurrencies with real-time prices, logos, 24-hour price changes, and 24-hour volume information.
- **Search Functionality**: Allows users to search for specific cryptocurrencies within the list.
- **Watchlist**: Users can create and manage a watchlist by marking cryptocurrencies with a star. The watchlist is displayed prominently on the main dashboard.
- **Price Charts**: Provides price change charts for cryptocurrencies in the watchlist, including views for 24 hours, 7 days, 30 days, and 1 year.
- **Detail Pages**: Each cryptocurrency has a dedicated detail page showing:
  - Logo
  - Name
  - Price change chart (24 hours, 7 days, 30 days, 1 year)
  - Description
  - Market capitalization
  - Lowest/Highest prices in the last 24 hours
- **News Integration (Bonus)**: Displays cryptocurrency news on the dashboard and specific news for each cryptocurrency on its detail page.

## Technologies Used

- **Framework**: Next.js for server-side rendering and optimized performance.
- **Styling**: SCSS for scalable and maintainable styling.
- **Data Fetching**: React Query for efficient data fetching and caching.
- **APIs**:
  - **CoinGecko API**: For retrieving cryptocurrency data.
  - **News API (Bonus)**: For fetching related news articles.
