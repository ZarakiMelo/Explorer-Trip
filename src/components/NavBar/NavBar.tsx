import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';  


const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
     
        <li className={styles['nav-item']}>
          <Link to="/myTrip" className={styles['nav-links']} onClick={toggleMenu}><span>Lancer un trip</span></Link>
        </li>
        <li className={styles['nav-item']}>
          <Link to="/allTrips" className={styles['nav-links']} onClick={toggleMenu}>Mes voyages</Link>
        </li>
  
    </nav>
  );
};

export default NavBar;