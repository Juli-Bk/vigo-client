import React from 'react';
import { render } from '@testing-library/react';
import TabSlider from '../TabSlider';

jest.mock('../../Product/ProductGridView/ProductGridView.js');

describe('TabSlider testing', () => {
  const testData = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
  const widthXs = 'xs';
  const widthSm = 'sm';
  const widthLg = 'lg';

  it('slider render proper slides amount', () => {
    const slider = render(<TabSlider data={testData} width={widthXs}/>);
    const options = slider.getAllByRole('option');
    expect(options.length).toEqual(testData.length);
  });

  it('slider has different visible slides on xs screen size', () => {
    render(<TabSlider data={testData} width={widthXs}/>);
    const visibleSlides = document.querySelectorAll('li[aria-selected="true"]');
    expect(visibleSlides.length).toEqual(1);
  });

  it('slider has different visible slides on sm screen size', () => {
    render(<TabSlider data={testData} width={widthSm}/>);
    const visibleSlides = document.querySelectorAll('li[aria-selected="true"]');
    expect(visibleSlides.length).toEqual(3);
  });

  it('slider has different visible slides on lg screen size', () => {
    render(<TabSlider data={testData} width={widthLg}/>);
    const visibleSlides = document.querySelectorAll('li[aria-selected="true"]');
    expect(visibleSlides.length).toEqual(4);
  });
});
