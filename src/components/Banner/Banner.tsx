import React from 'react';
import styles from './Banner.module.css';
import Divider from '../Divider/Divider';
import Title from '../Title/Title';

interface BannerProps {
    text: string;
}

const Banner: React.FC<BannerProps> = ({text}) => {
  
  return (
  <div className={styles.banner_container}>
    <Divider/>
    <Title text={text}/>
    <div className={styles.image_container}>
        <img className={styles.banner_image} src='../bannerPicture.jpg' alt='child with a map'/>
    </div>
   <Divider/>
  </div>
  );
};

export default Banner;