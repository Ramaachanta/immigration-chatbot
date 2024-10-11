import React from 'react'; 
import * as nextImage from 'next/image';


jest.mock('next/image', () => {
  return ({ src, alt, width, height }) => {
    return <img src={src} alt={alt} width={width} height={height} />;
  };
});
