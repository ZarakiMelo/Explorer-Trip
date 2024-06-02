import React from 'react';

interface ImageItem {
  src: string;
  text: string;
}

interface StepsProps {
  images: ImageItem[];
}

const Steps: React.FC<StepsProps> = ({ images }) => {
  return (
    <div className="horizontal-images">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.src} alt={image.text} />
          <p>{image.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Steps;