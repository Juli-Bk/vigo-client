import React from 'react';
import RadioButtons from './Radio';
import { configure, shallow } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
let wrapper;

beforeEach(() => {
  wrapper = shallow(<RadioButtons />);
});

afterEach(() => {
  wrapper.unmount();
});

describe('RadioButtons component', () => {
  it('renders', () => {
    wrapper = shallow(<RadioButtons/>);
    expect(wrapper.exists()).toBe(true);
  });
});
