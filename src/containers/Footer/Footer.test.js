import {configure, mount} from 'enzyme';
import React from 'react';
import expect from 'expect';
import {wait} from '@testing-library/react';
import Typography from '@material-ui/core/Typography';
import Footer from './Footer';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Footer with all expected info', () => {
  let wrapper;

  beforeEach(async () => {
    await wait(() => {
      wrapper = mount(<Footer />);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display Information List Header', () => {
    expect(wrapper.find(Typography).at(0).text()).toContain('Information');
  });
});