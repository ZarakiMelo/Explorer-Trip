import React from 'react';
import NavBar from '../NavBar/NavBar';
import styles from './Hero.module.css';  // Import du fichier CSS


const Hero: React.FC = () => {
  return (
    <div className={styles.container_hero}>
      <NavBar/>
    </div>
  );
};

export default Hero;