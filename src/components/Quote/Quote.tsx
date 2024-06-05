import React from 'react';
import styles from '../Quote/Quote.module.css';
import { QuoteProps } from '../../types';


const Quote: React.FC<QuoteProps> = ({ text, author, position }) => {
  const containerClass =
    position === 'left'
      ? styles.quote_left_container
      : styles.quote_right_container;
  return (
    <div className={containerClass}>
      <p className={styles.quote_text}>
        {text} ({author})
      </p>
    </div>
  );
};

export default Quote;