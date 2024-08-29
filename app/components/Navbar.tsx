// components/Navbar.js
import Link from 'next/link';
import styles from '@/app/styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Crypto App</Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/watchlist">Watchlist</Link>
        <Link href="/news">News</Link>
        <Link href="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
