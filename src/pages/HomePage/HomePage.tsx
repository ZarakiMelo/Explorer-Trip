// pages/HomePage.tsx
import React from 'react';
import Hero from '../../components/Hero/Hero';
import Quotes from '../../components/Quotes/Quotes';
import Divider from '../../components/Divider/Divider';
import Title from '../../components/Title/Title';
import Banner from '../../components/Banner/Banner';
import Steps from '../../components/Steps/Steps';
import styles from './HomePage.module.css'

const titles : string[] = [
"Avec ExplorerTrip, prévoir son parcours n’a jamais été aussi simple !",
"Prêts pour une nouvelle aventure ?",
"Gallery",
]


const HomePage: React.FC = () => {
  return (
      <div className={styles.container}>
        <Hero />
        <Quotes/>
        <Banner text={titles[0]}/>
        <Steps/>
        <Title text={titles[1]}/>
      </div>
  );
};

export default HomePage;