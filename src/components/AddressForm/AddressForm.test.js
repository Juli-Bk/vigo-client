import { configure, mount } from 'enzyme';
import React from 'react';
import expect from 'expect';
import {wait} from '@testing-library/react';
import Button from '@material-ui/core/Button';
import AddressForm from './AddressForm';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../redux/store';
import { Provider } from 'react-redux';

configure({adapter: new Adapter()});

const validBuilding = 'testBuilding';
const invalidBuilding = '';

const validAppart = 'testAppart';
const invalidAppart = '';

const validPostCode = '02002';

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

describe('AddressForm with all expected props', () => {
  let wrapper;
  let onSubmitCallback;

  beforeEach(async () => {
    onSubmitCallback = jest.fn();

    await wait(() => {
      wrapper = mount(<Provider store={store}><AddressForm submitAddressHandler={onSubmitCallback}/></Provider>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display three form fields', () => {
    expect(wrapper.find('input[name="address"]')).toBeTruthy();
    expect(wrapper.find('input[name="house"]')).toBeTruthy();
    expect(wrapper.find('input[name="apartment"]')).toBeTruthy();
    expect(wrapper.find('input[name="postalCode"]')).toBeTruthy();
  });

  it('Should update building Number input field on change', () => {
    updateField(wrapper.find('input[name="house"]'), 'house', validBuilding);
    expect(wrapper.find('input[name="house"]').props().value).toEqual(validBuilding);
  });

  it('Should update apartment Number input field on change', () => {
    updateField(wrapper.find('input[name="apartment"]'), 'apartment', validAppart);
    expect(wrapper.find('input[name="apartment"]').props().value).toEqual(validAppart);
  });

  it('Should update postal code input field on change', () => {
    updateField(wrapper.find('input[name="postalCode"]'), 'postalCode', validPostCode);
    expect(wrapper.find('input[name="postalCode"]').props().value).toEqual(validPostCode);
  });

  it('Should trigger submit on submit clicked with valid form', async () => {
    updateField(wrapper.find('input[name="house"]'), 'house', validBuilding);
    updateField(wrapper.find('input[name="apartment"]'), 'apartment', validAppart);
    updateField(wrapper.find('input[name="postalCode"]'), 'postalCode', validPostCode);

    const button = wrapper.find('button[type="submit"]');
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
          house: validBuilding,
          apartment: validAppart,
          postalCode: validPostCode,
          saveMyData: false
        }, expect.any(Function));
    }, 3000);
  });

  it('Should not trigger submit on submit clicked with invalid house', async () => {
    updateField(wrapper.find('input[name="house"]'), 'house', invalidBuilding);

    const button = wrapper.find('button[type="submit"]');
    button.simulate('click', {
      preventDefault: () => {
      }
    });

    wrapper.update();

    setTimeout(() => {
      expect(onSubmitCallback).not.toHaveBeenCalled();
    }, 3000);
  });

  it('Should trigger submit on submit click with empty apartment', async () => {
    updateField(wrapper.find('input[name="apartment"]'), 'apartment', invalidAppart);

    const button = wrapper.find('button[type="submit"]');
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