import { configure, mount } from 'enzyme';
import React from 'react';
import expect from 'expect';
import PaymentForm from './PaymentForm';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Sort from '../Sort/Sort';

configure({adapter: new Adapter()});

const paymentOptions = {
  BY_CASH: 'BY_CASH',
  LIQ_PAY: 'LIQ_PAY'
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

describe('PaymentForm with all expected props', () => {
  const updateField = mount(<PaymentForm />);
  afterEach(() => {
    updateField.unmount();
  });

  it('Should display autocomplete form field', () => {
    expect(updateField.find('input[name="payment"]')).toBeTruthy();
  });

  it('switch function renders proper paymentOptions', () => {
    render(<Provider store={store}><Sort values={paymentOptions}/></Provider>);
    const options = document.querySelectorAll('option');
    expect(options.length).toBe(Object.values(paymentOptions).length);
    expect(options[0].value).toBe(paymentOptions.BY_CASH);
  });
});