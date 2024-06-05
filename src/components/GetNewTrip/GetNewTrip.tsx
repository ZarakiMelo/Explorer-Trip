import React from 'react';
import styles from './GetNewTrip.module.css';
import { Link } from 'react-router-dom';



const GetNewTrip: React.FC= () => {
  return (
    <div className={styles.container}>
          <Link to="/myTripPage" className={styles.link} > <div className={styles.nav}>Organiser un nouveau voyage</div></Link>
    </div>
  );
};

export default GetNewTrip;