import React from 'react';
import styles from './StepCard.module.css';

interface StepProps {
    src: string;
    text:string;
    description:string;
    number:number;
}

const StepCard: React.FC<StepProps> = ({ text, src,description, number  }) => {
  
  return (
    <div className={styles.card}>
      <img className={styles.image} src={src} alt={description}/>
      <p className={styles.text}>{text}</p>
      <p className={styles.number}>{number}</p>
    </div>
  );
};

export default StepCard;