import React from 'react';
import {configure, mount} from 'enzyme';
import Logo from './Logo';
import { BrowserRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { wait } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const testData = 'description';

describe('Logo testing', () => {
  let wrapper;

  beforeEach(async () => {
    await wait(() => {
      wrapper = mount(<BrowserRouter><Logo description={testData}/></BrowserRouter>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display newsletter header', () => {
    expect(wrapper.find(Typography).at(0).text()).toContain(testData);
  });
});