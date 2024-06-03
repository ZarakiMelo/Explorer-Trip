import React from 'react';
import styles from './Divider.module.css';

const Divider: React.FC = () => {
  return (
    <div className={styles.divider_container}>
        <hr className={styles.horizontal_divider} />
    </div>
  )
};

export default Divider;