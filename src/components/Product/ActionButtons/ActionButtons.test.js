import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import ActionButtons from './ActionButtons';

const testClasses = {
  button: 'classes',
  icon: 'classes',
  iconChosen: 'classes',
  label: 'classes',
  labelChosen: 'classes'
};
const testProduct = {_id: '112345'};
const changeWishList = jest.fn();

describe('action buttons testing', () => {
  it('render testing', function () {
    render(
      <Provider store={store}>
        <ActionButtons classes={testClasses} product={testProduct} changeWishList={changeWishList}/>
      </Provider>);
    const addToCartBtn = document.querySelector('button');
    expect(addToCartBtn).toBeInTheDocument();
    expect(document.querySelectorAll('svg').length).toBe(2);
  });

  it('should render labels for icons on product page', function () {
    render(
      <Provider store={store}>
        <ActionButtons classes={testClasses} isProductPage product={testProduct} changeWishList={changeWishList}/>
      </Provider>);
    const label = document.querySelector('p');
    expect(label).toBeInTheDocument();
  });
});