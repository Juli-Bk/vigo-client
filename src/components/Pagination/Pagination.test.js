import React from 'react';
import { render } from '@testing-library/react';
import PaginationRounded from './Pagination';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const perPage = 10;
const total = 96;
const setCurrentPage = jest.fn();

describe('pagination testing', () => {
  it('pagination renders proper pages amount', () => {
    const { getByText } = render(<Provider store={store}><PaginationRounded perPage={perPage} total={total}/></Provider>);
    expect(getByText(/10/)).toBeInTheDocument();
  });

  it('pagination renders proper pages amount', () => {
    render(<Provider store={store}>
      <PaginationRounded perPage={perPage} total={total} setCurrentPage={setCurrentPage}/>
    </Provider>);
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).toBe(8);
  });
});