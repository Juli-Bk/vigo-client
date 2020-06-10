import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import ProductListView from './ProductListView';
import { calculateSale } from '../../../helpers/helpers';
jest.mock('../ActionButtons/ActionButtons');

const testData2 = {
  _id: 'aaa3342453786497',
  id: 1,
  name: 'Orange dress',
  description: 'Very-very-very beautiful orange dress. Very-very-very beautiful orange dress. Very-very-very beautiful orange dress',
  price: 450,
  rating: 4,
  imageUrls: ['/img/products/07_002.jpg'],
  salePrice: 405,
  isOnSale: true,
  date: Date.now()
};

const widthSm = 'sm';

describe('product card testing', () => {
  it('product card list renders salePrice when product has sale price', () => {
    const card = render(
      <BrowserRouter>
        <ProductListView
          productData={testData2}
          width={widthSm}/>
      </BrowserRouter>);
    const salePrice = card.getByText(`$${testData2.salePrice}`);
    expect(salePrice).toBeInTheDocument();
  });
  it('product card list renders proper product description', () => {
    const card = render(<BrowserRouter><ProductListView productData={testData2} width={widthSm}/></BrowserRouter>);
    const text = card.getByText(testData2.description);
    expect(text).toBeInTheDocument();
  });
  it('product card list renders proper product name', () => {
    const card = render(<BrowserRouter><ProductListView productData={testData2} width={widthSm}/></BrowserRouter>);
    const text = card.getByText(testData2.name);
    expect(text).toBeInTheDocument();
  });
  it('product card list renders saleInfoBox when product sale price', () => {
    const card = render(<BrowserRouter><ProductListView productData={testData2} width={widthSm}/></BrowserRouter>);
    const saleInfo = card.getByText(calculateSale(testData2.price, testData2.salePrice));
    expect(saleInfo).toBeInTheDocument();
  });
  it('on click by image should be redirection to product page', () => {
    const card = render(<BrowserRouter><ProductListView productData={testData2} width={widthSm}/></BrowserRouter>);
    const linkImg = card.getByTitle('clothing');
    fireEvent.click(linkImg);
    expect(window.location.pathname).toBe(`/products/${testData2._id}`);
  });
  it('on click by product name should be redirection to product page', () => {
    const card = render(<BrowserRouter><ProductListView productData={testData2} width={widthSm}/></BrowserRouter>);
    const linkName = card.getByText(testData2.name);
    fireEvent.click(linkName);
    expect(window.location.pathname).toBe(`/products/${testData2._id}`);
  });
});