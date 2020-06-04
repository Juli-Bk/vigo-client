import { configure, mount } from 'enzyme';
import React from 'react';
import expect from 'expect';
import {wait} from '@testing-library/react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import Adapter from 'enzyme-adapter-react-16';

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
      wrapper = mount(<AddressForm submitAddressHandler={onSubmitCallback}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display New customer header', () => {
    expect(wrapper.find(Typography).at(0).text()).toContain('your delivery address');
  });

  it('Should display seven form fields', () => {
    expect(wrapper.find('input[name="buildingNumber"]')).toBeTruthy();
    expect(wrapper.find('input[name="appartNumber"]')).toBeTruthy();
    expect(wrapper.find('input[name="postCode"]')).toBeTruthy();
  });

  it('Should update building Number input field on change', () => {
    updateField(wrapper.find('input[name="buildingNumber"]'), 'buildingNumber', validBuilding);
    expect(wrapper.find('input[name="buildingNumber"]').props().value).toEqual(validBuilding);
  });

  it('Should update apartment Number input field on change', () => {
    updateField(wrapper.find('input[name="appartNumber"]'), 'appartNumber', validAppart);
    expect(wrapper.find('input[name="appartNumber"]').props().value).toEqual(validAppart);
  });

  it('Should update postal code input field on change', () => {
    updateField(wrapper.find('input[name="postCode"]'), 'postCode', validPostCode);
    expect(wrapper.find('input[name="postCode"]').props().value).toEqual(validPostCode);
  });

  it('Should trigger submit on submit clicked with valid form', async () => {
    updateField(wrapper.find('input[name="buildingNumber"]'), 'buildingNumber', validBuilding);
    updateField(wrapper.find('input[name="appartNumber"]'), 'appartNumber', validAppart);
    updateField(wrapper.find('input[name="postCode"]'), 'postCode', validPostCode);

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
          buildingNumber: validBuilding,
          appartNumber: validAppart,
          postCode: validPostCode,
          saveMyData: false
        }, expect.any(Function));
    }, 3000);
  });

  it('Should not trigger submit on submit clicked with invalid buildingNumber', async () => {
    updateField(wrapper.find('input[name="buildingNumber"]'), 'buildingNumber', invalidBuilding);
    //
    // it('Should not trigger submit on submit clicked with invalid appartNumber', async () => {
    // updateField(wrapper.find('input[name="appartNumber"]'), 'appartNumber', invalidAppart);

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

  it('Should not trigger submit on submit clicked with invalid appartNumber', async () => {
    updateField(wrapper.find('input[name="appartNumber"]'), 'address', invalidAppart);

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