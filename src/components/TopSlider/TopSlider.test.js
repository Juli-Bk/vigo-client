import React from 'react';
import { configure, mount } from 'enzyme';
import expect from 'expect';
import { wait } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { Typography } from '@material-ui/core';
import TopSlider from './TopSlider';
import { BrowserRouter } from 'react-router-dom';
import globalConfig from '../../globalConfig';

configure({adapter: new Adapter()});

describe('Top Slider testing', () => {
  let wrapper;
  beforeEach(async () => {
    await wait(() => {
      wrapper = mount(<BrowserRouter><TopSlider/></BrowserRouter>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('top slider renders', () => {
    expect(wrapper.find(Typography).length).toEqual(globalConfig.topSliderImages.length * 2);
    expect(wrapper.find(Typography).at(0).text()).toBe(globalConfig.topSliderData.title);
    expect(wrapper.find(Typography).at(1).text()).toBe(globalConfig.topSliderData.text);
  });
});