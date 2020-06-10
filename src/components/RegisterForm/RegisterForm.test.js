import {configure, mount} from 'enzyme';
import React from 'react';
import expect from 'expect';
import {wait} from '@testing-library/react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RegisterForm from './RegisterForm';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const validEmailValue = 'test@test.test';
const invalidEmailValue = 'test';

const validPassword = '12345678';
const invalidPassword = '1234567';

const validPasswordConfirm = '12345678';
const invalidPasswordConfirm = '1234567';

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

  it('Should display New customer header', () => {
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

  it('Should update password input field on change', () => {
    updateField(wrapper.find('input[name="password"]'), 'password', validPassword);
    expect(wrapper.find('input[name="password"]').props().value).toEqual(validPassword);
  });

  it('Should update ConfirmPassword input field on change', () => {
    updateField(wrapper.find('input[name="confirmPassword"]'), 'confirmPassword', validPasswordConfirm);
    expect(wrapper.find('input[name="confirmPassword"]').props().value).toEqual(validPasswordConfirm);
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

  it('Should show error with invalid confirmPassword input field on blur', async () => {
    const field = wrapper.find('input[name="confirmPassword"]');
    field.simulate('focus');
    updateField(field, 'confirmPassword', invalidPasswordConfirm);

    await wait(() => {
      field.simulate('blur', {
        target: {
          name: 'confirmPassword',
          value: invalidPasswordConfirm
        }
      });
    });

    wrapper.update();
    const updatedField = wrapper.find('input[name="confirmPassword"]');
    expect(updatedField.props().value).toEqual(invalidPasswordConfirm);
    expect(updatedField.props()['aria-invalid']).toEqual(true);
  });

  it('Should trigger submit on submit clicked with valid form', async () => {
    updateField(wrapper.find('input[name="email"]'), 'email', validEmailValue);
    updateField(wrapper.find('input[name="password"]'), 'password', validPassword);
    updateField(wrapper.find('input[name="confirmPassword"]'), 'confirmPassword', validPasswordConfirm);

    const button = wrapper.find(Button);
    expect(button.props().type).toEqual('submit');
    await wait(() => {
      button.simulate('click', {
        preventDefault: () => {
        }
      });
    });

    wrapper.update();

    setTimeout(() => {
      expect(onSubmitCallback)
        .toHaveBeenCalledWith({
          email: validEmailValue,
          password: validPassword,
          confirmPassword: validPasswordConfirm,
          saveMyData: false
        }, expect.any(Function));
    }, 3000);
  });

  it('Should not trigger submit on submit clicked with invalid form', async () => {
    updateField(wrapper.find('input[name="email"]'), 'email', invalidEmailValue);

    const button = wrapper.find(Button);
    expect(button.props().type).toEqual('submit');
    button.simulate('click', {
      preventDefault: () => {
      }
    });

    wrapper.update();

    setTimeout(() => {
      expect(onSubmitCallback).not.toHaveBeenCalled();
    }, 3000);
  });

  it('Should not trigger submit on submit clicked with invalid password form', async () => {
    updateField(wrapper.find('input[name="password"]'), 'password', invalidPassword);

    const button = wrapper.find(Button);
    expect(button.props().type).toEqual('submit');
    button.simulate('click', {
      preventDefault: () => {
      }
    });

    wrapper.update();

    setTimeout(() => {
      expect(onSubmitCallback).not.toHaveBeenCalled();
    }, 3000);
  });

  it('Should not trigger submit on submit clicked with invalid confirmPassword form', async () => {
    updateField(wrapper.find('input[name="confirmPassword"]'), 'confirmPassword', invalidPasswordConfirm);

    const button = wrapper.find(Button);
    expect(button.props().type).toEqual('submit');
    button.simulate('click', {
      preventDefault: () => {
      }
    });

    wrapper.update();

    setTimeout(() => {
      expect(onSubmitCallback).not.toHaveBeenCalled();
    }, 3000);
  });
});