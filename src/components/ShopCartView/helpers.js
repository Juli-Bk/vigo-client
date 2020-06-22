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
    return [...shoppingCart.filter(item => item.productId !== productId), updatedProduct];
  }
};

export const getSubtotal = (price, quantity) => {
  return quantity ? price * quantity : price;
};
