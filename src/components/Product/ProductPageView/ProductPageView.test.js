import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import ProductPageView from './ProductPageView';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
jest.mock('../ActionButtons/ActionButtons');

const testData2 = {
  _id: '5ee4ebb487ae95ab81b85fa0',
  id: 1,
  name: 'Orange dress',
  brandId: {
    name: 'testName'
  },
  productId: 12,
  description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
  price: 450,
  rating: 4,
  imageUrls: ['/img/products/07_002.jpg'],
  salePrice: 405,
  date: Date.now()
};

const quantity = [
  {
    sizeId: {
      name: 'm'
    },
    colorId: {
      name: 'red'
    }
  },
  {
    sizeId: {
      name: 's'
    },
    colorId: {
      name: 'red'
    }
  }
];

const widthSm = 'sm';

describe('product page view testing', () => {
  it('product page view renders salePrice when product has sale price', () => {
    const card = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPageView productData={testData2} width={widthSm} productQuantity={quantity}/>
        </Provider>
      </BrowserRouter>);
    const salePrice = card.getByText(`$${testData2.salePrice}`);
    expect(salePrice).toBeInTheDocument();
  });
  it('product page view renders proper product description', () => {
    const card = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPageView productData={testData2} width={widthSm} productQuantity={quantity}/>
        </Provider>
      </BrowserRouter>);
    const text = card.getByText(testData2.description);
    expect(text).toBeInTheDocument();
  });
  it('product page view renders proper product name', () => {
    const card = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPageView productData={testData2} width={widthSm} productQuantity={quantity}/>
        </Provider>
      </BrowserRouter>);
    const text = card.getByText(testData2.name);
    expect(text).toBeInTheDocument();
  });
  it('product page renders select block', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPageView productData={testData2} width={widthSm} productQuantity={quantity}/>
        </Provider>
      </BrowserRouter>);
    const select = document.querySelector('select');
    expect(select).toBeInTheDocument();
  });
});