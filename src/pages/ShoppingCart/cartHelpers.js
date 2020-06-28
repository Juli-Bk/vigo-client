import {getUserIdFromCookie} from '../../ajax/common/helper';
import AjaxUtils from '../../ajax';
import {getStorageData, setStorageData} from '../../helpers/helpers';

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

const cartHandler = (products) => {
  const userId = getUserIdFromCookie();
  const cartId = getStorageData('cartId');
  if (userId) {
    AjaxUtils.ShopCart.getUserShopCart(userId)
      .then(result => {
        if (result.message) {
          AjaxUtils.ShopCart.createShopCart(userId, products)
            .then(result => {
              if (result && result.status === 400) {
                console.log(result.message);
              } else {
                // todo nice popup
                if (result && result._id) {
                  setStorageData('cartId', result._id);
                }
              }
            }).catch(err => {
              console.log('cartHelper createShopCart error: ', err);
            });
        } else {
          AjaxUtils.ShopCart.updateShopCartById(result._id, products, result.userId)
            .then(result => {
              if (result && result.status === 400) {
                console.log(result.message);
              } else {
                // todo nice popup
                if (result && result._id) {
                  setStorageData('cartId', result._id);
                }
              }
            }).catch(err => {
              console.log('cartHelper updateShopCartById error: ', err);
            });
        }
      });
  } else if (!userId && cartId.length) {
    AjaxUtils.ShopCart.updateShopCartById(cartId, products)
      .then(result => {
        if (result && result.status === 400) {
          console.log(result.message);
        } else {
          // todo nice popup
          console.log('updating for unregistered user', result);
        }
      }).catch(err => {
        console.log('cartHelper updateShopCartById error: ', err);
      });
  } else {
    AjaxUtils.ShopCart.createShopCart(null, products)
      .then(result => {
        if (result && result.status === 400) {
          console.log(result.message);
        } else {
          // todo nice popup
          console.log(result);
          if (result && result.cart) {
            setStorageData('cartId', result.cart._id);
          }
        }
      }).catch(err => {
        console.log('cartHelper createShopCart error: ', err);
      });
  }
};

export const addToCart = (productId, cartQuantity = 1, sizeId = '') => {
  const shopCartLocal = getStorageData('shoppingCart');
  const product = {
    productId,
    cartQuantity,
    sizeId
  };

  const itemInCart = shopCartLocal.find(item => item.productId === productId);
  if (itemInCart) {
    if (sizeId !== itemInCart.sizeId) {
      const newItem = {
        productId,
        cartQuantity,
        sizeId
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

  cartHandler(getStorageData('shoppingCart'));
};

export const deleteFromCart = (productId) => {
  const shopCartLocal = getStorageData('shoppingCart');
  if (shopCartLocal && shopCartLocal.length) {
    const products = shopCartLocal.filter(item => item.productId !== productId);
    setStorageData('shoppingCart', products);
    cartHandler(products);
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
        cartHandler([localItem]);
      }
    });
  }
  setStorageData('shoppingCart', localCart);
};