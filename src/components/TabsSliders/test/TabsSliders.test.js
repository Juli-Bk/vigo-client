import React from 'react';
import { render } from '@testing-library/react';
import TabsSliders from '../TabsSliders';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

jest.mock('../../Product/ProductGridView/ProductGridView.js');

describe('tabs with sliders testing', () => {
  const tabsNames = ['new arrivals', 'featured', 'special'];

  it('tabs with sliders renders', () => {
    render(<Provider store={store}><TabsSliders tabsNames={tabsNames} width='lg'/></Provider>);
    const tabs = document.querySelector('div[aria-label="tabs-for-sliders"]');
    expect(tabs).toBeInTheDocument();
  });

  it('tabs with sliders renders proper tabs names', () => {
    const tabsSliders = render(
      <Provider store={store}>
        <TabsSliders tabsNames={tabsNames} width='lg'/>
      </Provider>);
    const textContainer = tabsSliders.getByText(/featured/i);
    expect(textContainer).toBeInTheDocument();
  });

  it('tabs with sliders renders one tab panel at once', () => {
    const tabsSliders = render(
      <Provider store={store}>
        <TabsSliders tabsNames={tabsNames} width='lg'/>
      </Provider>);
    const tabPanels = tabsSliders.getAllByRole('tabpanel');
    expect(tabPanels.length).toEqual(1);
  });
});
