import React from 'react';
import styles from './StepCard.module.css';
import { StepCardProps } from '../../types';



const StepCard: React.FC<StepCardProps> = ({ text, src,description, number  }) => {
  
  return (
    <div className={styles.card}>
      <img className={styles.image} src={src} alt={description}/>
      <p className={styles.text}>{text}</p>
      <p className={styles.number}>{number}</p>
    </div>
  );
};

export default StepCard;