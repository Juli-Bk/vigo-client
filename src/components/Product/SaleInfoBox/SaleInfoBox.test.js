import React from 'react';
import { configure, mount } from 'enzyme';
import expect from 'expect';
import { wait } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { Box } from '@material-ui/core';
import SaleInfoBox from './SaleInfoBox';

configure({adapter: new Adapter()});

describe('sale box testing', () => {
  let wrapper;

  it('sale box renders correct text', async () => {
    await wait(() => {
      wrapper = mount(<SaleInfoBox price={500} salePrice={400}/>);
    });
    expect(wrapper.find(Box).text()).toEqual('-20%');
  });
  it('sale box renders correct text', async () => {
    await wait(() => {
      wrapper = mount(<SaleInfoBox price={500} salePrice={412}/>);
    });
    expect(wrapper.find(Box).text()).toEqual('Sale');
  });
});
