import {configure, mount} from 'enzyme';
import React from 'react';
import expect from 'expect';
import {wait} from '@testing-library/react';
import Typography from '@material-ui/core/Typography';
import RegisterForm from './RegisterForm';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const validEmailValue = 'test@test.test';
const invalidEmailValue = 'test';

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

describe('RegisterForm with all expected props', () => {
  let wrapper;
  let onSubmitCallback;

  beforeEach(async () => {
    onSubmitCallback = jest.fn();

    await wait(() => {
      wrapper = mount(<RegisterForm submitRegisterHandler={onSubmitCallback}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display header', () => {
    expect(wrapper.find(Typography).at(0).text()).toContain('Register with us for future convenience:');
  });

  it('Should display three form field', () => {
    expect(wrapper.find('input[name="email"]')).toBeTruthy();
    expect(wrapper.find('input[name="password"]')).toBeTruthy();
    expect(wrapper.find('input[name="confirmPassword"]')).toBeTruthy();
  });

  it('Should update email input field on change', () => {
    updateField(wrapper.find('input[name="email"]'), 'email', validEmailValue);
    expect(wrapper.find('input[name="email"]').props().value).toEqual(validEmailValue);
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
});