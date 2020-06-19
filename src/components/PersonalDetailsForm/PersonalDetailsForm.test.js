import { configure, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import expect from 'expect';
import {wait} from '@testing-library/react';
import Typography from '@material-ui/core/Typography';
import PersonalDetailsForm from './PersonalDetailsForm';
import Adapter from 'enzyme-adapter-react-16';

const mockStore = configureStore([]);

configure({adapter: new Adapter()});
const validFirstName = 'someName';
const invalidFirstName = 'nn';

const validLastNameValue = 'someLastName';
const invalidLastNameValue = 'test';

const validPhoneValue = '+38(098)1112233';

const validEmail = 'testEm';

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

describe('PersonalDetailsForm with all expected props', () => {
  let wrapper;
  let onSubmitCallback;

  const user = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@mail.ru',
    phoneNumber: '+38(098)1112233'
  };

  const store = mockStore({
    setUser: jest.fn()
  });

  beforeEach(async () => {
    onSubmitCallback = jest.fn();

    await wait(() => {
      wrapper = mount(<Provider store={store}><PersonalDetailsForm user={user} submitPersonalDetailsHandler={onSubmitCallback}/></Provider>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  xit('Should display New customer header', () => {
    expect(wrapper.find(Typography).at(0).text()).toContain('your personal details');
  });

  xit('Should display seven form fields', () => {
    expect(wrapper.find('input[name="firstName"]')).toBeTruthy();
    expect(wrapper.find('input[name="lastName"]')).toBeTruthy();
    expect(wrapper.find('input[name="phone"]')).toBeTruthy();
    expect(wrapper.find('input[name="email"]')).toBeTruthy();
  });

  xit('Should update First Name input field on change', () => {
    updateField(wrapper.find('input[name="firstName"]'), 'firstName', validFirstName);
    expect(wrapper.find('input[name="firstName"]').props().value).toEqual(validFirstName);
  });

  xit('Should update Last Name input field on change', () => {
    updateField(wrapper.find('input[name="lastName"]'), 'lastName', validLastNameValue);
    expect(wrapper.find('input[name="lastName"]').props().value).toEqual(validLastNameValue);
  });

  xit('Should update phone input field on change', () => {
    updateField(wrapper.find('input[name="phoneNumber"]'), 'phone', validPhoneValue);
    expect(wrapper.find('input[name="phoneNumber"]').props().value).toEqual(validPhoneValue);
  });

  xit('Should update email input field on change', () => {
    updateField(wrapper.find('input[name="email"]'), 'email', validEmail);
    expect(wrapper.find('input[name="email"]').props().value).toEqual(validEmail);
  });

  xit('Should show error with invalid name input field on blur', async () => {
    const field = wrapper.find('input[name="firstName"]');
    field.simulate('focus');
    updateField(field, 'firstName', invalidFirstName);

    await wait(() => {
      field.simulate('blur', {
        target: {
          name: 'firstName',
          value: invalidFirstName
        }
      });
    });

    wrapper.update();
    const updatedField = wrapper.find('input[name="firstName"]');
    expect(updatedField.props().value).toEqual(invalidFirstName);
    expect(updatedField.props()['aria-invalid']).toEqual(true);
  });

  xit('Should show error with invalid last Name input field on blur', async () => {
    const field = wrapper.find('input[name="lastName"]');
    field.simulate('focus');
    updateField(field, 'lastName', invalidLastNameValue);

    await wait(() => {
      field.simulate('blur', {
        target: {
          name: 'lastName',
          value: invalidLastNameValue
        }
      });
    });

    wrapper.update();
    const updatedField = wrapper.find('input[name="lastName"]');
    expect(updatedField.props().value).toEqual(invalidLastNameValue);
    expect(updatedField.props()['aria-invalid']).toEqual(false);
  });
});