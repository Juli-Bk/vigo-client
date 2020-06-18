import {configure, mount} from 'enzyme';
import React from 'react';
import expect from 'expect';
import {wait} from '@testing-library/react';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';
import Adapter from 'enzyme-adapter-react-16';
import AjaxUtils from '../../ajax';

configure({adapter: new Adapter()});

const validEmailValue = 'test@test.test';
const invalidEmailValue = 'test';

const validPassword = '12345678';
const invalidPassword = '1234567';

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

describe('LoginForm with all expected props', () => {
  let wrapper;
  let onSubmitCallback;

  beforeEach(async () => {
    onSubmitCallback = jest.fn(AjaxUtils.Users.login);

    await wait(() => {
      wrapper = mount(<LoginForm submitLoginHandler={onSubmitCallback}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display registered customer header', () => {
    expect(wrapper.find(Typography).at(0).text()).toContain('If you have an account, please log in');
  });

  it('Should display three form field', () => {
    expect(wrapper.find('input[name="email"]')).toBeTruthy();
    expect(wrapper.find('input[name="password"]')).toBeTruthy();
    expect(wrapper.find('input[name="saveMyData"]')).toBeTruthy();
  });

  it('Should update email input field on change', () => {
    updateField(wrapper.find('input[name="email"]'), 'email', validEmailValue);
    expect(wrapper.find('input[name="email"]').props().value).toEqual(validEmailValue);
  });

  it('Should update password input field on change', () => {
    updateField(wrapper.find('input[name="password"]'), 'password', validPassword);
    expect(wrapper.find('input[name="password"]').props().value).toEqual(validPassword);
  });

  it('Should show error with invalid email input field on blur', async () => {
    const field = wrapper.find('input[name="email"]');
    field.simulate('focus');
    updateField(field, 'email', invalidEmailValue);

    await wait(() => {
      field.simulate('blur', {
        target: {
          name: 'email',
          value: invalidEmailValue
        }
      });
    });

    wrapper.update();
    const updatedField = wrapper.find('input[name="email"]');
    expect(updatedField.props().value).toEqual(invalidEmailValue);
    expect(updatedField.props()['aria-invalid']).toEqual(true);
  });

  it('Should show error with invalid password input field on blur', async () => {
    const field = wrapper.find('input[name="password"]');
    field.simulate('focus');
    updateField(field, 'password', invalidPassword);

    await wait(() => {
      field.simulate('blur', {
        target: {
          name: 'password',
          value: invalidPassword
        }
      });
    });

    wrapper.update();
    const updatedField = wrapper.find('input[name="password"]');
    expect(updatedField.props().value).toEqual(invalidPassword);
    expect(updatedField.props()['aria-invalid']).toEqual(true);
  });
});