import React from 'react';
import { render } from '@testing-library/react';
import FilterPrice from './FilterPrice';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const setPriceRange = jest.fn();

describe('filter price testing', () => {
  it('filter price renders', () => {
    const filter = render(<Provider store={store}>
      <FilterPrice
        maxProductsPrice={1000}
        priceRange={[5, 100]}
        setPriceRange={setPriceRange}
      />
    </Provider>);
    expect(filter.getByText(/price/i)).toBeInTheDocument();
  });
});
