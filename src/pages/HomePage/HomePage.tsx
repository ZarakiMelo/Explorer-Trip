// pages/HomePage.tsx
import React from 'react';
import Hero from '../../components/Hero/Hero';
import Quotes from '../../components/Quotes/Quotes';
import Divider from '../../components/Divider/Divider';
import Title from '../../components/Title/Title';
import Banner from '../../components/Banner/Banner';

const titles : string[] = [
"Avec ExplorerTrip, prévoir son parcours n’a jamais été aussi simple !",
"Prêt à partir à l’aventure ?",
"Gallery"
]


const HomePage: React.FC = () => {
  return (
      <>
        <Hero />
        <Quotes/>
        <Banner text={titles[0]}/>
      </>
  );
};

export default HomePage;