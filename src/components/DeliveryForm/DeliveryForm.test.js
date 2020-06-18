import { configure, mount } from 'enzyme';
import React from 'react';
import expect from 'expect';
import DeliveryForm from './DeliveryForm';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Sort from '../Sort/Sort';

configure({adapter: new Adapter()});
const deliveryOptions = {
  VIGO_COURIER_SERVICE: 'VIGO_COURIER_SERVICE',
  NOVA_POSHTA: 'NOVA_POSHTA',
  UKRPOSHTA: 'UKRPOSHTA',
  PICKUP: 'PICKUP'
};
const updateField = (name, value) => {
  updateField.simulate('change', {
    persist: () => {
    },
    target: {
      name,
      value
    }
  });
};
describe('DeliveryForm with all expected props', () => {
  const updateField = mount(<Provider store={store}><DeliveryForm /></Provider>);
  afterEach(() => {
  });

  it('Should display autocomplete form field', () => {
    expect(updateField.find('input[name="delivery"]')).toBeTruthy();
  });

  it('switch function renders proper deliveryOptions', () => {
    render(<Provider store={store}><Sort values={deliveryOptions}/></Provider>);
    const options = document.querySelectorAll('option');
    expect(options.length).toBe(Object.values(deliveryOptions).length);
    expect(options[0].value).toBe(deliveryOptions.VIGO_COURIER_SERVICE);
  });
});