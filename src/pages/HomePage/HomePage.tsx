// pages/HomePage.tsx
import React from 'react';
import Hero from '../../components/Hero/Hero';
import Quotes from '../../components/Quotes/Quotes';
import Divider from '../../components/Divider/Divider';

const titles : String[] = [
"Avec ExplorerTrip, prévoir son parcours n’a jamais été aussi simple !",
"Prêt à partir à l’aventure ?",
"Gallery"
]


const HomePage: React.FC = () => {
  return (
      <>
        <Hero />
        <Quotes/>
        <Divider/>
        <h2>{titles[0]}</h2>
        <h2>{titles[1]}</h2>
        <h2>{titles[2]}</h2>
      </>
      
  
  );
};

export default HomePage;