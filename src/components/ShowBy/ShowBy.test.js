import React from 'react';
import { render } from '@testing-library/react';
import ShowBy from './ShowBy';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const step = 10;

describe('show by testing', () => {
  it('show by render correct value', () => {
    render(<Provider store={store}><ShowBy step={step} productsPerPage={10}/></Provider>);
    const select = document.querySelector('select');
    expect(select.value).toBe('10');
  });
});