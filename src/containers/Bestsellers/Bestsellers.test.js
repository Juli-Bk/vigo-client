import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Bestsellers from './Bestsellers';

const width1 = 'sm';

describe('bestsellers section testing', () => {
  it('bestsellers has it`s title', () => {
    const box = render(<BrowserRouter><Bestsellers width={width1}/></BrowserRouter>);
    const title = box.getByText('Bestsellers');
    expect(title).toBeInTheDocument();
  });
});