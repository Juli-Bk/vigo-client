import React from 'react';
import {getUserIdFromCookie } from '../ajax/common/helper';
import AjaxUtils from '../ajax';
import globalConfig from '../globalConfig';

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
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const integrateData = (remoteWishList, localWishList) => {
  remoteWishList.forEach(product => {
    if (!localWishList.includes(product._id)) localWishList.push(product._id);
  });
  setStorageData('wishList', localWishList);
};

export const integrateCart = (remoteCart, localCart) => {
  remoteCart.forEach(item => {
    if (!localCart.includes(item.productId)) localCart.push(item.productId);
  });
  setStorageData('shoppingCart', localCart);
};

export const toggleWishItems = (productId) => {
  const userId = getUserIdFromCookie();
  const wishListLocal = getStorageData('wishList');

  if (wishListLocal.includes(productId)) {
    setStorageData('wishList', wishListLocal.filter(item => item !== productId));

    if (userId) {
      AjaxUtils.WishLists.deleteProductFromWishlist(productId)
        .then(result => {
          if (result.status) {
            // todo nice popup
            alert(globalConfig.userMessages.NOT_AUTHORIZED);
          }
          console.log(result);
        });
    }
  } else {
    setStorageData('wishList', [...wishListLocal, productId]);

    if (userId) {
      AjaxUtils.WishLists.addProductToWishList(productId, userId)
        .then(result => {
          if (result.status) {
            alert(globalConfig.userMessages.NOT_AUTHORIZED);
          }
          console.log(result);
        });
    }
  }
};

export const cartHandler = (productId, quantity = 1) => {
  const userId = getUserIdFromCookie();
  const shopCartLocal = getStorageData('shoppingCart');
  const cartId = JSON.parse(localStorage.getItem('cartId'));

  const products = shopCartLocal.map(() => {
    return {
      productId,
      cartQuantity: quantity
    };
  });

  if (shopCartLocal.includes(productId)) {
    setStorageData('shoppingCart', shopCartLocal.filter(item => item !== productId));
  } else {
    setStorageData('shoppingCart', [...shopCartLocal, productId]);
  }
  if (userId && !cartId) {
    AjaxUtils.ShopCart.getUserShopCart(userId)
      .then(result => {
        if (result.message) {
          AjaxUtils.ShopCart.createShopCart(userId, products)
            .then(result => {
              // todo nice popup
              console.log(result);
              setStorageData('cartId', result._id);
            });
        } else {
          AjaxUtils.ShopCart.updateShopCartById(result._id, products, result.userId)
            .then(result => {
              // todo nice popup
              console.log(result);
              setStorageData('cartId', result._id);
            });
        }
      });
  } else if (!userId && cartId) {
    AjaxUtils.ShopCart.updateShopCartById(cartId, products)
      .then(result => {
        // todo nice popup
        console.log(result);
      });
  } else {
    AjaxUtils.ShopCart.createShopCart(null, products)
      .then(result => {
        // todo nice popup
        console.log(result);
        setStorageData('cartId', result._id);
      });
  }
};

export const defineSortData = (option) => {
  switch (option) {
    case globalConfig.sortOptions.New_In:
      return '-date';
    case globalConfig.sortOptions.Price_High_To_Low:
      return '-price';
    case globalConfig.sortOptions.Price_Low_To_High:
      return 'price';
    default:
      return '-date';
  }
};

export const makeFilterItem = (string) => {
  const filterString = string.split('=');
  const key = filterString[0];
  const value = filterString[1];
  return {[key]: value};
};