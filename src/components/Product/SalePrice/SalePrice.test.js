import React from 'react';
import { configure, mount } from 'enzyme';
import expect from 'expect';
import { wait } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { Typography } from '@material-ui/core';
import SalePrice from './SalePrice';

configure({adapter: new Adapter()});

const testValue = 40;

describe('sale price box testing', () => {
  let wrapper;

  beforeEach(async () => {
    await wait(() => {
      wrapper = mount(<SalePrice value={testValue}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('sale price box renders correct text', () => {
    expect(wrapper.find(Typography).text()).toEqual(`$${testValue}`);
  });
});