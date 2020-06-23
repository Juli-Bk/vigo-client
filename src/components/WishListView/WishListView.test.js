import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import WishListView from './WishListView';

const mockStore = configureStore([]);
const products = [
  {
    _id: '5ee4ebcc87ae95ab81b85ff8',
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
    _id: '5ee4ebb287ae95ab81b85f9b',
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
    _id: '5ee4ebb387ae95ab81b85f9c',
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
const wishList = ['5ee4ebb387ae95ab81b85f9c', '5ee4ebb287ae95ab81b85f9b', '5ee4ebcc87ae95ab81b85ff8'];
const changeWishList = jest.fn();

describe('products table testing', () => {
  const store = mockStore({
    wishList: ['5ee4ebb387ae95ab81b85f9c', '5ee4ebb287ae95ab81b85f9b', '5ee4ebcc87ae95ab81b85ff8'],
    changeWishList: jest.fn()
  });
  it('should render proper columns amount', function () {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <WishListView
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
          <WishListView
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
          <WishListView
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
          <WishListView
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
