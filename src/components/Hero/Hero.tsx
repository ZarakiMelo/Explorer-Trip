import React from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Hero.module.css';  // Import du fichier CSS


const Hero: React.FC = () => {
  return (
    <div className={styles.container_hero}>
      <div className={styles.logo_container}> 
        <img className={styles.logo} src='/appLogo.png' />
      </div>
      <NavBar/>
    </div>
  );
};

export default Hero;