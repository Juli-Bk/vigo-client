import React from 'react';

export const formPriceString = (price, priceToCeil) => {
  if (priceToCeil) {
    return `$${Math.ceil(price)}`;
  }
  return `$${price.toFixed(2)}`;
};

export const calculatePerPageParam = (width) => {
  let perPage;
  width === 'sm' ? perPage = 2 : perPage = 3;
  return perPage;
};

export const calculateSale = (price, salePrice) => {
  let saleInfo;
  const saleSize = (price - salePrice) / price * 100;
  if (saleSize <= 1) return null;
  if (saleSize % 5 === 0) {
    saleInfo = `-${saleSize}%`;
  } else {
    saleInfo = 'Sale';
  }
  return saleInfo;
};

export const defineVisibleSlides = (width) => {
  switch (width) {
    case 'xs':
      return 1;
    case 'sm':
      return 3;
    default:
      return 4;
  }
};

export const mapImagesForGallery = (product, render) => {
  const images = [];

  product.imageUrls.forEach(item => {
    const img = {};
    img.original = item;
    img.thumbnail = item;
    images.push(img);
  });

  if (product.videoUrl) {
    const videoItem = images[images.length - 1];
    videoItem.embedUrl = product.videoUrl;
    videoItem.thumbnailClass = 'false-play-button';
    videoItem.renderItem = render;
  }
  return images;
};

export const capitalize = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const makeShortText = (text) => {
  const textArray = text.split('.');
  if (textArray[0].length > 100) {
    const shortString = textArray[0].slice(0, 100);
    const index = shortString.lastIndexOf(' ');
    return shortString.slice(0, index).concat('...');
  }
  return textArray[0];
};

export const calcMaxPrice = (array) => {
  const prices = [];
  array.forEach(object => {
    prices.push(Number(object.price));
  });
  return Math.max(...prices);
};

export const mapArrayToOptions = (array) => {
  return array.map(item => {
    return <option value={item} key={item}>{item}</option>;
  });
};

export const makeNumbersArray = (number) => {
  const array = [];
  for (let i = 1; i <= Number(number); i++) {
    array.push(i);
  }
  return array;
};

export const changeOrder = (arrayOfId, arrayOfObjects) => {
  const newObjectsArray = [];
  arrayOfId.forEach(id => {
    newObjectsArray.push(arrayOfObjects.find(object => object._id === id));
  });
  return newObjectsArray.reverse();
};

export const getStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};