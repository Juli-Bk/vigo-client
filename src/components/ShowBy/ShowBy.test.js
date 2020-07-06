import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ShowBy from './ShowBy';

const step = 10;

describe('show by testing', () => {
  it('show by render correct value', () => {
    render(<BrowserRouter><ShowBy step={step}/></BrowserRouter>);
    const select = document.querySelector('select');
    expect(select.value).toBe('10');
  });
});