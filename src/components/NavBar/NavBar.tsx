import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NavBar.module.css';  
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>
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