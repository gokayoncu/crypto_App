'use client';

import React from 'react';
import styles from '@/app/styles/About.module.css'; // Import the CSS module

const About: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.description}>
        **Cryptocurrency Tracking Application**
      </p>
      <p className={styles.description}>
        This project is a web-based application designed for tracking and managing cryptocurrencies. It allows users to view all cryptocurrencies with up-to-date prices, create watchlists, and perform detailed analyses. Here are the key features of the application:
      </p>

      <h2 className={styles.subTitle}>Features</h2>
      <ul className={styles.featuresList}>
        <li>
          <strong>Cryptocurrency List</strong>: View all cryptocurrencies with their current prices, logos, 24-hour price change, and 24-hour volume information.
        </li>
        <li>
          <strong>Search Functionality</strong>: Users can search for specific cryptocurrencies within the list to quickly find what they’re looking for.
        </li>
        <li>
          <strong>Watchlist</strong>: Users can add cryptocurrencies to a watchlist by marking them with a star. The watchlist is displayed prominently on the main screen.
        </li>
        <li>
          <strong>Price Charts</strong>: Display price change charts for cryptocurrencies in the watchlist (24 hours, 7 days, 30 days, 1 year).
        </li>
        <li>
          <strong>Detail Pages</strong>: Each cryptocurrency has a detail page that includes the logo, name, price change chart, description, market cap, and the lowest/highest prices of the last 24 hours.
        </li>
        <li>
          <strong>Cryptocurrency News</strong>: Bonus feature – users can view general cryptocurrency news on the dashboard and news specific to each cryptocurrency on its detail page.
        </li>
      </ul>
    </div>
  );
};

export default About;
