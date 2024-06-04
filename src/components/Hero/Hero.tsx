import React from 'react';
import HomeNavBar from '../HomeNavBar/HomeNavBar';
import styles from './Hero.module.css'; 


const Hero: React.FC = () => {
  
  return (
    <div className={styles.container_hero}>
      <div className={styles.logo_container}> 
        <img className={styles.logo} src='/appLogo.png' alt="app's logo" />
      </div>
      <HomeNavBar/>
    </div>
  );
};

export default Hero;