import React from 'react';
import { configure, mount } from 'enzyme';
import expect from 'expect';
import { wait } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { Typography } from '@material-ui/core';
import TopSlider from './TopSlider';

configure({adapter: new Adapter()});

const testData = {
  title: 'testTitle',
  text: 'testText',
  buttonText: 'testButtonText'
};
const urls = [
  {
    original: '/img/top-slider/top_slider_1.jpg'
  },
  {
    original: '/img/top-slider/top_slider_2.jpg'
  },
  {
    original: '/img/top-slider/top_slider_3.jpg'
  }
];

describe('Top Slider testing', () => {
  let wrapper;
  beforeEach(async () => {
    await wait(() => {
      wrapper = mount(<TopSlider renderData={testData} imgUrls={urls}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('top slider renders correct data on the photo', () => {
    expect(wrapper.find(Typography).length).toEqual(urls.length * 2);
    expect(wrapper.find(Typography).at(0).text()).toBe(testData.title);
    expect(wrapper.find(Typography).at(1).text()).toBe(testData.text);
  });
});