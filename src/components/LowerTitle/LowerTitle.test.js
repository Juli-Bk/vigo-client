import React from 'react';
import { configure, mount } from 'enzyme';
import expect from 'expect';
import LowerTitle from './LowerTitle';
import { wait } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { Typography } from '@material-ui/core';

configure({adapter: new Adapter()});

const testText = 'test data';

describe('lower title testing', () => {
  let wrapper;

  beforeEach(async () => {
    await wait(() => {
      wrapper = mount(<LowerTitle text={testText} />);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('title box renders correct text', () => {
    expect(wrapper.find(Typography).text()).toEqual(testText);
  });
});
