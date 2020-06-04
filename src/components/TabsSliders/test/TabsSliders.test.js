import React from 'react';
import { render } from '@testing-library/react';
import TabsSliders from '../TabsSliders';

jest.mock('../../Product/ProductGridView/ProductGridView.js');

describe('tabs with sliders testing', () => {
  const tabsNames = ['new arrivals', 'featured', 'special'];

  it('tabs with sliders renders', () => {
    render(<TabsSliders tabsNames={tabsNames} width='lg'/>);
    const tabs = document.querySelector('div[aria-label="tabs-for-sliders"]');
    expect(tabs).toBeInTheDocument();
  });

  it('tabs with sliders renders proper tabs names', () => {
    const tabsSliders = render(<TabsSliders tabsNames={tabsNames} width='lg'/>);
    const textContainer = tabsSliders.getByText(tabsNames[0]);
    expect(textContainer).toBeInTheDocument();
  });

  it('tabs with sliders renders one tab panel at once', () => {
    const tabsSliders = render(<TabsSliders tabsNames={tabsNames} width='lg'/>);
    const tabPanels = tabsSliders.getAllByRole('tabpanel');
    expect(tabPanels.length).toEqual(1);
  });
});
