import React from 'react';
import StepCard from '../StepCard/StepCard';
import styles from './Steps.module.css';
import { ImageItem } from '../../types';



const stepsImages : ImageItem[] = [
  { src:"/directionnalsPicture.jpg",
    text:"Choisissez vos destinations",
    description:"directionnal signs",
    number: 1,
  },
  {
    src:"/mapPicture.jpg",
    text:"Visualisez votre parcours",
    description:"map picture",
    number: 2,
  },
  {
    src:"/mansPicture.jpg",
    text:"Partagez votre projet !",
    description:"man picture",
    number:3,
  }
]

const Steps: React.FC = () => {
  return (
    <div className={styles.steps_container}>
      {stepsImages.map((image, index) => (
        <StepCard key={index} text={image.text} src={image.src} description={image.description} number={image.number}/>
      ))}
    </div>
  );
};

export default Steps;