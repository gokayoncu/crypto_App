# Cryptocurrency Tracking Application

Live site: https://crypto-k9n0q8uwr-gokayoncus-projects.vercel.app/ <br>
           https://curious-platypus-cdf6ab.netlify.app/

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
![news2](https://github.com/user-attachments/assets/9aeb5aa4-ad74-4f22-a6ff-f1eeb299c5c0)
![news](https://github.com/user-attachments/assets/98dce734-7391-4e65-9556-96bc09bae73c)

## Note

*Please note that the News API integration is currently only functional on the local server. As a result, images and related content may not be displayed properly on the live site. We apologize for any inconvenience this may cause and recommend checking the application on the local server for the full experience.*

## Technologies Used

- **Framework**: Next.js for server-side rendering and optimized performance.
- **Styling**: SCSS for scalable and maintainable styling.
- **Data Fetching**: React Query for efficient data fetching and caching.
- **APIs**:
  - **CoinGecko API**: For retrieving cryptocurrency data.
  - **News API (Bonus)**: For fetching related news articles.
