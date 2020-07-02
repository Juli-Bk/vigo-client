import { configure, mount } from 'enzyme';
import React from 'react';
import expect from 'expect';
import PaymentForm from './PaymentForm';
import Adapter from 'enzyme-adapter-react-16';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Sort from '../Sort/Sort';
import { BrowserRouter } from 'react-router-dom';

configure({adapter: new Adapter()});

const paymentOptions = {
  BY_CASH: 'BY_CASH',
  LIQ_PAY: 'LIQ_PAY'
};

describe('PaymentForm with all expected props', () => {
  const form = mount(<Provider store={store}><PaymentForm /></Provider>);
  afterEach(() => {
    form.unmount();
  });

  it('switch function renders proper paymentOptions', () => {
    render(<BrowserRouter><Provider store={store}><Sort values={paymentOptions}/></Provider></BrowserRouter>);
    const options = document.querySelectorAll('option');
    expect(options.length).toBe(Object.values(paymentOptions).length);
    expect(options[0].value).toBe(paymentOptions.BY_CASH);
  });
});