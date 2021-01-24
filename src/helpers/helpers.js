import React from 'react';
import globalConfig from '../globalConfig';
import AjaxUtils from '../ajax';

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
  if (!text) throw new Error('text is empty');
  const textArray = text.split('.');
  if (textArray[0].length > 100) {
    const shortString = textArray[0].slice(0, 100);
    const index = shortString.lastIndexOf(' ');
    return shortString.slice(0, index).concat('...');
  }
  return textArray[0];
};

export const mapArrayToOptions = (array) => {
  return array.map((item, index) => {
    return <option value={item} key={`${item}-${index}`}>{capitalize(item)}</option>;
  });
};

export const changeOrder = (arrayOfId, arrayOfObjects) => {
  const newObjectsArray = [];
  if (arrayOfObjects) {
    arrayOfId.forEach(id => {
      const product = arrayOfObjects.find(object => object._id === id);
      if (product) {
        newObjectsArray.push(product);
      } else {
        setStorageData('recentlyViewed', [...arrayOfId.filter(item => item !== id)]);
      }
    });
  }
  return newObjectsArray.reverse();
};

export const getStorageData = (key) => {
  const defaultUserValue = (key === 'user') ? {} : [];
  return JSON.parse(localStorage.getItem(key)) || defaultUserValue;
};

export const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const integrateWishLists = (remoteWishList, userId) => {
  const localWishList = getStorageData('wishList');
  if (localWishList && localWishList.length) {
    remoteWishList.forEach(product => {
      if (!localWishList.includes(product._id)) {
        localWishList.push(product._id);
      }
    });
    localWishList.forEach(item => {
      const itemInRemoteList = remoteWishList.find(product => product._id === item);
      if (!itemInRemoteList) {
        AjaxUtils.WishLists.addProductToWishList(item, userId)
          .catch(err => {
            console.log('add product to wishlist error happened', err);
          }
          );
      }
    });
    setStorageData('wishList', localWishList);
  } else {
    setStorageData('wishList', remoteWishList);
  }
};

export const getMaxQuantity = (productQuantity, size) => {
  if (productQuantity && productQuantity.length) {
    if (size && size !== globalConfig.defaultSizeOption) {
      const product = productQuantity.find(item => item.sizeId.name === size);
      if (product && product.quantity) return product.quantity || 0;
    }
  }
};

export const getProductStockData = (quantityArray, productId) => {
  if (quantityArray && quantityArray.length) {
    const productQuantity = quantityArray.find(item => item.productId === productId);
    if (productQuantity && productQuantity.inStock.length) {
      return productQuantity.inStock || [];
    }
  }
};

export const getColorData = (quantityArray) => {
  if (quantityArray && quantityArray.length) {
    return {
      name: capitalize(quantityArray[0] && quantityArray[0].colorId.name),
      id: quantityArray[0].colorId._id
    };
  } else {
    return {
      name: '',
      id: ''
    };
  }
};

export const getChosenSizeId = (productQuantity, chosenSize) => {
  if (productQuantity && chosenSize) {
    const item = productQuantity.find(item => item.sizeId.name === chosenSize);
    if (item && item.sizeId) {
      return item.sizeId._id || '';
    }
  }
};

export const getSizesArray = (productQuantity) => {
  const sizesArray = [];
  if (productQuantity && productQuantity.length) {
    productQuantity.forEach(item => {
      sizesArray.push(item.sizeId.name);
    });
    sizesArray.unshift(globalConfig.defaultSizeOption);
  }
  return sizesArray;
};

export const has = (object, key) => {
  return object ? hasOwnProperty.call(object, key) : false;
};

export const isEmptyObj = (obj) => {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const getFiltersArray = (filtersObject) => {
  const array = Object.entries(filtersObject);
  const arrayOfObj = [];
  array.forEach(item => {
    arrayOfObj.push({[item[0]]: item[1]});
  });
  return arrayOfObj || [];
};

export const getFilterString = (parsed, field, target) => {
  if (parsed[field]) {
    if (!parsed[field].includes(target)) {
      parsed[field] += `,${target}`;
    } else {
      const array = parsed[field].split(',');
      parsed[field] = array.filter(el => el !== target).join(',');
    }
  } else {
    parsed[field] = target;
  }
  parsed.startPage = 1;
  return parsed;
};

export const getUrlData = (parsed, prop) => {
  const initialState = {};
  if (parsed[prop]) {
    const colorsArray = parsed[prop].split(',');
    colorsArray.forEach(name => {
      initialState[name] = true;
    });
  }
  return initialState;
};

export const getColorsState = (allColors, dataFromSearchString) => {
  let state = {};
  allColors.forEach(item => {
    state = {
      ...state,
      [item.name]: false
    };
  });
  return Object.assign({}, state, dataFromSearchString);
};

export const getSizesState = (allSizes, dataFromSearchString) => {
  let state = {};
  allSizes.forEach(name => {
    state = {
      ...state,
      [name]: false
    };
  });
  return Object.assign({}, state, dataFromSearchString);
};

export const deleteProps = (object, props) => {
  const newObj = Object.assign({}, object);
  props.forEach(prop => {
    if (newObj[prop]) {
      delete newObj[prop];
    }
  });
  return newObj;
};

export const filterWishList = (productsInOrder) => {
  const localWishList = getStorageData('wishList');
  let updatedWishList = [];
  const productsId = [];
  productsInOrder.forEach(item => {
    productsId.push(item.productId);
  });
  productsId.forEach(id => {
    if (localWishList.filter(item => item === id)) {
      updatedWishList = localWishList.filter(item => item !== id);
    }
  });
  setStorageData('wishList', updatedWishList);
};

export const getGuestInfo = (guestData) => {
  if (guestData.deliveryAddress) {
    return guestData;
  } else {
    const data = getStorageData('guestData');
    if (Array.isArray(data)) return {};
    return data;
  }
};

export const findBadId = (message) => {
  if (!message) {
    throw new Error('empty method parameter');
  }
  const part = message.split('invalid filter _id: "')[1];
  return part ? part.split('"')[0] : null;
};

export const removeBadIdFromStorage = (badId) => {
  const shopCart = getStorageData('shoppingCart');
  const updatedWishList = removeIdFromArray(badId, getStorageData('wishList'));
  const updatedRecentlyViewed = removeIdFromArray(badId, getStorageData('recentlyViewed'));
  const updatedCompareList = removeIdFromArray(badId, getStorageData('compareList'));

  setStorageData('wishList', updatedWishList);
  setStorageData('recentlyViewed', updatedRecentlyViewed);
  setStorageData('compareList', updatedCompareList);

  const itemInCart = shopCart.find(item => item.productId === badId);
  if (itemInCart) {
    const updatedCart = shopCart.filter(item => item.productId !== badId);
    setStorageData('shoppingCart', updatedCart);
  }
};

const removeIdFromArray = (id, array) => {
  let updatedArray;
  if (array.includes(id)) {
    updatedArray = array.filter(item => item !== id);
  } else {
    updatedArray = array;
  }
  return updatedArray;
};

export const isIdInArray = (products, id) => {
  const idArray = [];
  let flag;
  products.forEach(item => {
    idArray.push(item._id);
  });
  idArray.find(item => item === id) ? flag = true : flag = false;
  return flag;
};