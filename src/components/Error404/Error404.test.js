import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Error404 from './Error404';

describe('404 page tests', () => {
  it('sorry image rendered properly', () => {
    const page = render(<BrowserRouter><Error404 /></BrowserRouter>);
    const img = page.getByTestId('img');
    expect(img).toBeInTheDocument();
  });
  it('404 dialog title rendered properly', () => {
    const page = render(<BrowserRouter><Error404 /></BrowserRouter>);
    const title = page.getByTestId('title');
    expect(title).toBeInTheDocument();
  });

  it('404 dialog second line rendered properly', () => {
    const page = render(<BrowserRouter><Error404 /></BrowserRouter>);
    const text = page.getByTestId('secondLine');
    expect(text).toBeInTheDocument();
  });

  it('404 dialog third line rendered properly', () => {
    const page = render(<BrowserRouter><Error404 searchText={true}/></BrowserRouter>);
    const text = page.getByTestId('thirdLine');
    expect(text).toBeInTheDocument();
  });
});