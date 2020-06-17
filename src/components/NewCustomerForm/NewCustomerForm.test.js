import { configure, mount } from 'enzyme';
import React from 'react';
import expect from 'expect';
import Typography from '@material-ui/core/Typography';
import NewCustomerForm from './NewCustomerForm';
import Adapter from 'enzyme-adapter-react-16';
import {wait} from '@testing-library/react';
import AjaxUtils from '../../ajax';

configure({adapter: new Adapter()});

const updateField = (wrapper, name, value) => {
  wrapper.simulate('change', {
    persist: () => {
    },
    target: {
      name,
      value
    }
  });
};

describe('New Customer Form with all expected props', () => {
  let wrapper;
  let onSubmitCallback;

  beforeEach(async () => {
    onSubmitCallback = jest.fn(AjaxUtils.Users.createUser);

    await wait(() => {
      wrapper = mount(<NewCustomerForm submitNewCustomerHandler = {onSubmitCallback}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display Title for new customer', () => {
    expect(wrapper.find(Typography).at(0).text()).toContain('How do you want to continue?');
  });

  it('Should display Subtitle for new customer', () => {
    expect(wrapper.find(Typography).at(1).text()).toContain('Register with us for future convenience:');
  });

  it('Should display radio lable Checkout as a guest', () => {
    expect(wrapper.find(Typography).at(2).text()).toContain('Checkout as a guest');
  });

  it('Should display radio lable Register', () => {
    expect(wrapper.find(Typography).at(3).text()).toContain('Register');
  });

  it('should change value when a new option has been selected', () => {
    updateField(wrapper.find('input[value="asGuest"]').simulate('change',
      { target: { id: 'radioOption1', checked: true }}
    ));
    expect(wrapper.find('input[value="asGuest"]').prop('checked')).toBe(false);

    updateField(wrapper.find('input[value="iWillRegister"]').simulate('change',
      { target: { id: 'radioOption2', checked: true }}
    ));
    expect(wrapper.find('input[value="iWillRegister"]').prop('checked')).toBe(false);

    wrapper.update();
  });
});
