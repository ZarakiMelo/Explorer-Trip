import React from 'react';
import styles from './Title.module.css';

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({text}) => {
  
  return (

      <p className={styles.title}>
        {text}
      </p>
  );
};

export default Title;