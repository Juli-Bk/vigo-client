import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductPageView from './ProductPageView';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

const testData2 = {
  _id: 'aaa3342453786497',
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

const widthSm = 'sm';

describe('product page view testing', () => {
  it('product page view renders salePrice when product has sale price', () => {
    const card = render(
      <Provider store={store}>
        <ProductPageView productData={testData2} width={widthSm}/>
      </Provider>);
    const salePrice = card.getByText(`$${testData2.salePrice}`);
    expect(salePrice).toBeInTheDocument();
  });
  it('product page view renders proper product description', () => {
    const card = render(
      <Provider store={store}>
        <ProductPageView productData={testData2} width={widthSm}/>
      </Provider>);
    const text = card.getByText(testData2.description);
    expect(text).toBeInTheDocument();
  });
  it('product page view renders proper product name', () => {
    const card = render(
      <Provider store={store}>
        <ProductPageView productData={testData2} width={widthSm}/>
      </Provider>);
    const text = card.getByText(testData2.name);
    expect(text).toBeInTheDocument();
  });
  it('product page renders two select blocks', () => {
    render(
      <Provider store={store}>
        <ProductPageView productData={testData2} width={widthSm}/>
      </Provider>);
    const selects = document.querySelectorAll('select');
    expect(selects.length).toEqual(2);
  });
});