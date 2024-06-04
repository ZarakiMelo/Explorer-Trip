
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';  


const NavBar: React.FC = () => {

  return (
    <nav className={styles.navbar}>
     
        <li className={styles['nav-item']}>
          <Link to="/myTrip" className={styles['nav-links']} >Lancer un trip</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link to="/allTrips" className={styles['nav-links']} >Mes voyages</Link>
        </li>
  
    </nav>
  );
};

export default NavBar;