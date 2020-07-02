import { configure, mount } from 'enzyme';
import React from 'react';
import expect from 'expect';
import DeliveryForm from './DeliveryForm';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Sort from '../Sort/Sort';
import { BrowserRouter } from 'react-router-dom';

configure({adapter: new Adapter()});
const deliveryOptions = {
  VIGO_COURIER_SERVICE: 'VIGO_COURIER_SERVICE',
  NOVA_POSHTA: 'NOVA_POSHTA',
  UKRPOSHTA: 'UKRPOSHTA',
  PICKUP: 'PICKUP'
};

describe('DeliveryForm with all expected props', () => {
  const form = mount(<Provider store={store}><DeliveryForm /></Provider>);
  afterEach(() => {
  });

  it('Should display autocomplete form field', () => {
    expect(form.find('input[name="delivery"]')).toBeTruthy();
  });

  it('switch function renders properly deliveryOptions', () => {
    render(<BrowserRouter><Provider store={store}><Sort values={deliveryOptions}/></Provider></BrowserRouter>);
    const options = document.querySelectorAll('option');
    expect(options.length).toBe(Object.values(deliveryOptions).length);
    expect(options[0].value).toBe(deliveryOptions.VIGO_COURIER_SERVICE);
  });
});