import React from 'react';
import styles from './MyTripPage.module.css';
import NewTrip from '../../components/NewTrip/NewTrip';

const MyTripPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <NewTrip/>
    </div>
  );
};

export default MyTripPage;