import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
// import { calculateSale } from '../../helpers/helpers';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import ProductsTable from './ProductsTable';

const testData = [
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
    isOnSale: true
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
    isOnSale: true
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
    isOnSale: true
  }
];

const wishList = ['aaa3342453786499', 'aaa3342453786498', 'aaa3342453786497'];

describe('products table testing', () => {
  it('should render proper columns amount', function () {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductsTable
            products={testData}
          />
        </Provider>
      </BrowserRouter>);
    const thead = document.querySelector('table');
    console.log(thead);
    const thCollection = thead.querySelectorAll('th');
    expect(thCollection.length).toBe(5);
  });
});
