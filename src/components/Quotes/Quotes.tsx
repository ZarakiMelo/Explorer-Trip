import React from 'react';
import styles from './Quotes.module.css'

const Quotes: React.FC = () => {
  return (
    <div className={styles.quotes_container}>
      <div className={styles.quote_left_container}>
          <text>« Un voyage de mille lieues commence toujours par un premier pas. » (Lao-Tseu)</text>
      </div>
      <div className={styles.quote_right_container}><text>« Le bonheur n’est pas une destination à atteindre, mais une façon de voyager. » (Margaret Lee Runbeck)</text></div>
      <div className={styles.quote_left_container}><text> « Voyager, c’est donner un sens à sa vie, voyager, c’est donner de la vie à ses sens. » (Alexandre Poussin)</text></div>
    </div>
  );
};

export default Quotes;