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

export const findItemsInCart = (productId, shoppingCart) => {
  const items = [];
  if (shoppingCart && shoppingCart.length) {
    shoppingCart.forEach(item => {
      if (item.productId === productId) items.push(item);
    });
  }
  return items;
};

export const getItemStockData = (productsQuantity, productId) => {
  if (productsQuantity && productsQuantity.length) {
    const itemInStock = productsQuantity.find(item => item.productId === productId);
    if (itemInStock && itemInStock.inStock) {
      return itemInStock.inStock;
    } else return [];
  }
};

export const getChosenProductData = (itemStockData, itemsInCart) => {
  const data = [];
  if (itemStockData && itemsInCart.length) {
    itemsInCart.forEach(item => {
      if (itemStockData.find(stockItem => stockItem.sizeId._id === item.sizeId)) {
        const itemInStock = itemStockData.find(stockItem => stockItem.sizeId._id === item.sizeId);
        data.push(itemInStock);
      }
    });
  }
  return data;
};

export const updateProductQuantity = (productId, newQuantity, shoppingCart, sizeId) => {
  const productToChange = shoppingCart.find(item => item.productId === productId && item.sizeId === sizeId);
  if (productToChange) {
    productToChange.cartQuantity = newQuantity;
    return productToChange;
  }
};

export const updateCartData = (shoppingCart, productId, updatedProduct, sizeId) => {
  if (shoppingCart.find(item => item.productId === productId && item.sizeId === sizeId)) {
    shoppingCart.forEach((item, index) => {
      if (item.productId === productId && item.sizeId === sizeId) {
        shoppingCart.splice(index, 1);
      }
    });
    return [...shoppingCart, updatedProduct];
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

  const itemsInCart = [];

  shopCartLocal.forEach(item => {
    if (item.productId === productId) {
      itemsInCart.push(item);
    }
  });
  if (itemsInCart.length) {
    itemsInCart.forEach(item => {
      if (sizeId !== item.sizeId) {
        const newItem = {
          productId,
          cartQuantity,
          sizeId,
          colorId
        };
        setStorageData('shoppingCart', [...shopCartLocal, newItem]);
      } else {
        let newQuantity = cartQuantity;
        if (cartQuantity === 1) {
          newQuantity = item.cartQuantity + 1;
        }
        const updatedItem = updateProductQuantity(productId, newQuantity, shopCartLocal, sizeId);
        const updatedCart = updateCartData(shopCartLocal, productId, updatedItem, sizeId);
        setStorageData('shoppingCart', updatedCart);
      }
    });
  } else {
    setStorageData('shoppingCart', [...shopCartLocal, product]);
  }
  store.dispatch(handleCart(getStorageData('shoppingCart')));
};

export const deleteFromCart = (productId, sizeId) => {
  const shopCartLocal = getStorageData('shoppingCart');
  if (shopCartLocal && shopCartLocal.length) {
    shopCartLocal.forEach((item, index) => {
      if (item.productId === productId && item.sizeId === sizeId) {
        shopCartLocal.splice(index, 1);
        setStorageData('shoppingCart', shopCartLocal);
        store.dispatch(handleCart(shopCartLocal));
      }
    });
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

export const getTotalSum = (allProductsInCart) => {
  let subTotalSum = 0;
  allProductsInCart.forEach(row => {
    if (row.salePrice && row.quantity) {
      subTotalSum += row.salePrice * row.quantity;
    }
  });
  return subTotalSum;
};