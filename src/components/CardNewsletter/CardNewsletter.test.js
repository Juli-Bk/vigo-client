import {configure, mount} from 'enzyme';
import React from 'react';
import expect from 'expect';
import {wait} from '@testing-library/react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardNewsletter from './CardNewsletter';
import Adapter from 'enzyme-adapter-react-16';
import AjaxUtils from '../../ajax';
import Cookie from 'js-cookie';

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

beforeEach(async () => {
  const token = 'example_token';
  Cookie.set('token', token, { path: '' });
});

afterEach(() => {
  Cookie.remove('token');
});

describe('CardNewsletter with all expected props', () => {
  let wrapper;
  let onSubmitCallback;

  beforeEach(async () => {
    onSubmitCallback = jest.fn(AjaxUtils.Subscribers.subscribe);

    await wait(() => {
      wrapper = mount(<CardNewsletter saveEmail={onSubmitCallback}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display newsletter header', () => {
    expect(wrapper.find(Typography).at(0).text()).toContain('newsletter');
  });

  it('Should display only one form field', () => {
    expect(wrapper.find('input[name="email"]')).toBeTruthy();
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

  it('Should trigger submit on submit clicked with valid form', async () => {
    updateField(wrapper.find('input[name="email"]'), 'email', validEmailValue);

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
        .toHaveBeenCalledWith({email: validEmailValue}, expect.any(Function));
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
});