
import { Link } from 'react-router-dom';
import styles from './HomeNavBar.module.css';  


const HomeNavBar: React.FC = () => {

  return (
    <nav className={styles.navbar}>
     
        <li className={styles['nav-item']}>
          <Link to="/myTripPage" className={styles['nav-links']} >Lancer un trip</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link to="/AllTripsPage" className={styles['nav-links']} >Mes voyages</Link>
        </li>
  
    </nav>
  );
};

export default HomeNavBar;