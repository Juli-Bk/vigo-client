import React from 'react';
import { render } from '@testing-library/react';
import ProductSlider from './ProductSlider';

const test = {
  imageUrls: ['url1', 'url2', 'url3', 'url4'],
  thumbnails: ['url1', 'url2', 'url3', 'url4'],
  videoUrl: 'https://www.youtube.com/watch?v=NVlKsL7wAEU'
};

const test1 = {
  imageUrls: ['url1', 'url2', 'url3', 'url4'],
  thumbnails: ['url1', 'url2', 'url3', 'url4']
};

describe('product slider testing', () => {
  it('should render proper slides amount', () => {
    render(<ProductSlider product={test1} />);
    const slides = document.querySelectorAll('.image-gallery-image');
    expect(slides.length).toBe(test.imageUrls.length);
  });

  it('should render proper slides amount with videoItem', () => {
    render(<ProductSlider product={test} />);
    const slides = document.querySelectorAll('.image-gallery-image');
    expect(slides.length).toBe(test.imageUrls.length - 1);
  });

  it('should render false play button', () => {
    render(<ProductSlider product={test} />);
    const buttons = document.querySelectorAll('.image-gallery-thumbnail');
    expect(buttons[buttons.length - 1]).toHaveClass('false-play-button');
  });

  it('should render proper video when product has videoUrl', function () {
    render(<ProductSlider product={test} />);
    const video = document.querySelector('source');
    expect(video).toBeInTheDocument();
    expect(video.src).toEqual(test.videoUrl);
  });
});