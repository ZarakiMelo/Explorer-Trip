import React from 'react';
import styles from './NewTrip.module.css';

import { Link } from 'react-router-dom';


const NewTrip: React.FC = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.header}> 
        <img className={styles.logo} src='/appLogo.png' alt="app's logo" />
        <nav className={styles.nav_container}>
            <nav className={styles.nav_item}>
                <Link to="/" className={styles.nav_link} >Accueil</Link>
            </nav>
            <nav className={styles.nav_item}>
                <Link to="/myTrip" className={styles.nav_link} >Mes voyages</Link>
            </nav>
        </nav>
       
        
      </div>
    </div>
  );
};

export default NewTrip;