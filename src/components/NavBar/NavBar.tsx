import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NavBar.module.css';  

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={ styles['nav-menu']}>
        <li className={styles['nav-item']}>
          <Link to="/myTrip" className={styles['nav-links']} onClick={toggleMenu}>Lancer un trip</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link to="/allTrips" className={styles['nav-links']} onClick={toggleMenu}>Mes voyages</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;