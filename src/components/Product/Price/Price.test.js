import React from 'react';
import { configure, mount } from 'enzyme';
import expect from 'expect';
import Price from './Price';
import { wait } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { Typography } from '@material-ui/core';

configure({adapter: new Adapter()});

const testValue = 40;

describe('price box testing', () => {
  let wrapper;

  beforeEach(async () => {
    await wait(() => {
      wrapper = mount(<Price value={testValue}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('price box renders correct text', () => {
    expect(wrapper.find(Typography).text()).toEqual(`$${testValue}`);
  });
});