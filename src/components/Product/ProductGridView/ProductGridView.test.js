import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from 'react-router-dom';
import ProductCard from './ProductGridView';
import {calculateSale} from '../../../helpers/helpers';

const testData2 = {
  _id: 'aaa3342453786497',
  id: 1,
  name: 'Orange dress',
  description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
  price: 450,
  rating: 4,
  imageUrls: ['/img/products/07_002.jpg'],
  salePrice: 405,
  date: Date.now()
};

describe('product card testing', () => {
  it('product card renders salePrice when product has sale price', () => {
    const card = render(<BrowserRouter><ProductCard productData={testData2}/></BrowserRouter>);
    const salePrice = card.getByText(`$${testData2.salePrice}`);
    expect(salePrice).toBeInTheDocument();
  });
  it('product card renders proper product description', () => {
    const card = render(<BrowserRouter><ProductCard productData={testData2}/></BrowserRouter>);
    const text = card.getByText('Very-very-very beautiful orange dress');
    expect(text).toBeInTheDocument();
  });
  it('product card renders proper product name', () => {
    const card = render(<BrowserRouter><ProductCard productData={testData2}/></BrowserRouter>);
    const text = card.getByText(testData2.name);
    expect(text).toBeInTheDocument();
  });
  it('product card renders saleInfoBox when product sale price', () => {
    const card = render(<BrowserRouter><ProductCard productData={testData2}/></BrowserRouter>);
    const saleInfo = card.getByText(calculateSale(testData2.price, testData2.salePrice));
    expect(saleInfo).toBeInTheDocument();
  });
});