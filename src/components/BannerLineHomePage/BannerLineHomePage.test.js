import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import BannerLineHomePage from './BannerLineHomePage';

describe('banner list testing', () => {
  it('banner line rendered properly', () => {
    const {getByTestId} = render(<BrowserRouter><BannerLineHomePage /></BrowserRouter>);
    const bannerLine = getByTestId('bannerContainer');
    expect(bannerLine).toBeInTheDocument();
  });
});