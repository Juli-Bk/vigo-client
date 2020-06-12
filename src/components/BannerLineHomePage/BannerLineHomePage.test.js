import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import BannerLineHomePage from './BannerLineHomePage';
import store from '../../redux/store';

describe('banner list testing', () => {
  it('banner line rendered properly', () => {
    const {getByTestId} = render(<Provider store={store}><BrowserRouter><BannerLineHomePage /></BrowserRouter></Provider>);
    const bannerLine = getByTestId('bannerContainer');
    expect(bannerLine).toBeInTheDocument();
  });
});