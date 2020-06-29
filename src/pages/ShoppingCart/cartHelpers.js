import {getStorageData, setStorageData} from '../../helpers/helpers';
import {handleCart} from '../../redux/actions/shopCart';
import store from '../../redux/store';

export const getProductsId = (shoppingCart) => {
  const array = [];
  if (shoppingCart && shoppingCart.length) {
    shoppingCart.forEach(item => {
      array.push(item.productId);
    });
  }
  return array;
};

export const findItemInCart = (productId, shoppingCart) => {
  if (shoppingCart && shoppingCart.length) {
    return shoppingCart.find(item => item.productId === productId);
  }
};

export const getItemStockData = (productsQuantity, productId) => {
  if (productsQuantity && productsQuantity.length) {
    const itemInStock = productsQuantity.find(item => item.productId === productId);
    if (itemInStock && itemInStock.inStock) return itemInStock.inStock;
  }
};

export const getChosenProductData = (itemStockData, itemInCart) => {
  if (itemStockData && itemInCart) {
    return itemStockData.find(item => item.sizeId._id === itemInCart.sizeId);
  }
};

export const updateProductQuantity = (productId, newQuantity, shoppingCart) => {
  const productToChange = shoppingCart.find(item => item.productId === productId);
  if (productToChange) {
    productToChange.cartQuantity = newQuantity;
    return productToChange;
  }
};

export const updateCartData = (shoppingCart, productId, updatedProduct) => {
  if (shoppingCart.find(item => item.productId === productId)) {
    const updatedCart = shoppingCart.filter(item => item.productId !== productId);
    return [...updatedCart, updatedProduct];
  }
};

export const getSubtotal = (price, quantity) => {
  return quantity ? price * quantity : price;
};

export const addToCart = (productId, cartQuantity = 1, sizeId = '', colorId = '') => {
  const shopCartLocal = getStorageData('shoppingCart');
  const product = {
    productId,
    cartQuantity,
    sizeId,
    colorId
  };

  const itemInCart = shopCartLocal.find(item => item.productId === productId);
  if (itemInCart) {
    if (sizeId !== itemInCart.sizeId) {
      const newItem = {
        productId,
        cartQuantity,
        sizeId,
        colorId
      };
      setStorageData('shoppingCart', [...shopCartLocal, newItem]);
    }
    if (cartQuantity !== itemInCart.cartQuantity) {
      const updatedItem = updateProductQuantity(productId, cartQuantity, shopCartLocal);
      const updatedCart = updateCartData(shopCartLocal, productId, updatedItem);
      setStorageData('shoppingCart', updatedCart);
    }
  } else {
    setStorageData('shoppingCart', [...shopCartLocal, product]);
  }

  store.dispatch(handleCart(getStorageData('shoppingCart')));
};

export const deleteFromCart = (productId) => {
  const shopCartLocal = getStorageData('shoppingCart');
  if (shopCartLocal && shopCartLocal.length) {
    const products = shopCartLocal.filter(item => item.productId !== productId);
    setStorageData('shoppingCart', products);
    store.dispatch(handleCart(products));
  }
};

export const integrateCarts = (remoteCart) => {
  const localCart = getStorageData('shoppingCart');
  if (localCart) {
    remoteCart.forEach(remoteItem => {
      const itemInLocalCart = localCart.find(localItem => localItem.productId === remoteItem.productId);
      if (!itemInLocalCart) {
        localCart.push(remoteItem);
      }
    });
    localCart.forEach(localItem => {
      const itemInRemoteCart = remoteCart.find(remoteItem => remoteItem.productId === localItem.productId);
      if (!itemInRemoteCart) {
        store.dispatch(handleCart([localItem]));
      }
    });
  }
  setStorageData('shoppingCart', localCart);
};