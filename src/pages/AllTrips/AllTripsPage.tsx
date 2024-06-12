import React from 'react';
import styles from './AllTripsPage.module.css';
import { Link } from 'react-router-dom';

const AllTripsPage: React.FC = () => {
  return (
    <div className={styles.container}>
        <Link to="/" className={styles.logo_container}>
          <img className={styles.logo} src='/appLogo.png' alt="app's logo" />
        </Link>
      <h1>Bientôt disponible</h1>
    </div>
  );
};

export default AllTripsPage;