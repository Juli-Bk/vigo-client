import React from 'react';
import { render } from '@testing-library/react';
import TabsSliders from '../TabsSliders';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

jest.mock('../../Product/ProductGridView/ProductGridView.js');
describe('tabs with sliders testing', () => {
  it('tabs with sliders renders', () => {
    render(<Provider store={store}><TabsSliders width='lg'/></Provider>);
    const tabs = document.querySelector('div[aria-label="tabs-for-sliders"]');
    expect(tabs).toBeInTheDocument();
  });
});
