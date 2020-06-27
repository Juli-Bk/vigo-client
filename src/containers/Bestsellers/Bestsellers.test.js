import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Bestsellers from './Bestsellers';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const width1 = 'sm';

describe('bestsellers section testing', () => {
  it('bestsellers has it`s title', () => {
    const box = render(<BrowserRouter>
      <Provider store={store}>
        <Bestsellers width={width1}/>
      </Provider>
    </BrowserRouter>);
    const title = box.getByText('Bestsellers');
    expect(title).toBeInTheDocument();
  });
});