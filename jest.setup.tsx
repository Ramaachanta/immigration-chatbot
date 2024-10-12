// jest.setup.tsx
import '@testing-library/jest-dom'; // Change to this
import React from 'react';

// Mocking the 'next/image' component
jest.mock('next/image', () => {
  return ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => {
    return <img src={src} alt={alt} width={width} height={height} />;
  };
});
