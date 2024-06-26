import React from 'react';
import styles from './Divider.module.css';

const Divider: React.FC = () => {
  return (
        <hr className={styles.horizontal_divider} />
  )
};

export default Divider;