import React from 'react';
import styles from './Quotes.module.css';
import Quote from '../Quote/Quote';

interface QuoteData {
  text: string;
  author: string;
  position: 'left' | 'right';
}

const quotes: QuoteData[] = [
  {
    text: '« Un voyage de mille lieues commence toujours par un premier pas. »',
    author: 'Lao-Tseu',
    position: 'left',
  },
  {
    text: '« Le bonheur n’est pas une destination à atteindre, mais une façon de voyager. »',
    author: 'Margaret Lee Runbeck',
    position: 'right',
  },
  {
    text: '« Voyager, c’est donner un sens à sa vie, voyager, c’est donner de la vie à ses sens. »',
    author: 'Alexandre Poussin',
    position: 'left',
  },
];

const Quotes: React.FC = () => {
  return (
    <div className={styles.quotes_container}>
      {quotes.map((quote, index) => (
        <Quote
          key={index}
          text={quote.text}
          author={quote.author}
          position={quote.position}
        />
      ))}
    </div>
  );
};

export default Quotes;