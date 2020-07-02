import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import FilterPrice from './FilterPrice';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const getPriceRange = jest.fn();

describe('filter price testing', () => {
  it('filter price renders', () => {
    const filter = render(
      <BrowserRouter>
        <Provider store={store}>
          <FilterPrice
            maxPrice={1000}
            getMaxPrice={getPriceRange}
          />
        </Provider>
      </BrowserRouter>);
    expect(filter.getByText(/price/i)).toBeInTheDocument();
  });
});
