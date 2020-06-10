import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProductsTable from './ProductsTable';

const mockStore = configureStore([]);
const products = [
  {
    _id: 'aaa3342453786497',
    id: 12345667890,
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/07_002.jpg'],
    salePrice: 405,
    date: Date.now(),
    isOnSale: true,
    color: 'red',
    size: 'size',
    productId: 1
  },
  {
    _id: 'aaa3342453786498',
    id: 12345667890,
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/07_002.jpg'],
    salePrice: 405,
    date: Date.now(),
    isOnSale: true,
    color: 'red',
    size: 'size',
    productId: 1
  },
  {
    _id: 'aaa3342453786499',
    id: 12345667890,
    name: 'Orange dress',
    description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
    price: 450,
    rating: 4,
    imageUrls: ['/img/products/07_002.jpg'],
    salePrice: 405,
    date: Date.now(),
    isOnSale: true,
    color: 'red',
    size: 'size',
    productId: 1
  }
];
const wishList = ['aaa3342453786497', 'aaa3342453786498', 'aaa3342453786499'];
const changeWishList = jest.fn();

describe('products table testing', () => {
  const store = mockStore({
    wishList: ['aaa3342453786499', 'aaa3342453786498', 'aaa3342453786497'],
    changeWishList: jest.fn()
  });
  it('should render proper columns amount', function () {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductsTable
            products={products}
            isMobile={false}
            changeWishList={changeWishList}
          />
        </Provider>
      </BrowserRouter>
    );
    const thead = document.querySelector('thead');
    expect(thead).toBeInTheDocument();
    const thCollection = thead.querySelectorAll('th');
    expect(thCollection.length).toBe(5);
  });
  it('should render proper columns amount on mobile screen', function () {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductsTable
            products={products}
            isMobile={true}
            changeWishList={changeWishList}
          />
        </Provider>
      </BrowserRouter>
    );
    const thead = document.querySelector('thead');
    expect(thead).toBeInTheDocument();
    const thCollection = thead.querySelectorAll('th');
    expect(thCollection.length).toBe(1);
  });
  it('should render proper rows amount', function () {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductsTable
            products={products}
            isMobile={false}
            wishlist={wishList}
            changeWishList={changeWishList}
          />
        </Provider>
      </BrowserRouter>
    );
    const trArray = document.querySelectorAll('tr');
    expect(trArray.length).toBe(wishList.length + 1);
  });
  it('should render proper product name', function () {
    const table = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductsTable
            products={products}
            isMobile={false}
            changeWishList={changeWishList}
          />
        </Provider>
      </BrowserRouter>
    );
    const names = table.getAllByText(/orange/i);
    expect(names[0]).toBeInTheDocument();
  });
});
