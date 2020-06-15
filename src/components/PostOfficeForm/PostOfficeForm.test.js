import { configure, mount } from 'enzyme';
import React from 'react';
import expect from 'expect';
import PostOfficeForm from './PostOfficeForm';
import Adapter from 'enzyme-adapter-react-16';
import { render, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Sort from '../Sort/Sort';
import Button from '@material-ui/core/Button';

configure({adapter: new Adapter()});

const validNpOffice = 'testNpOffice';
const invalidNpOffice = 'invalidNpOffice';

const validCity = 'validCity';

const regions = {
  KYIV: 'KYIV'
};

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

describe('PostOffice Form with all expected props', () => {
  let wrapper;
  let onSubmitCallback;
  beforeEach(async () => {
    onSubmitCallback = jest.fn();

    await wait(() => {
      wrapper = mount(<PostOfficeForm submitNovaPoshtaHandler={onSubmitCallback}/>);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should display two form fields', () => {
    expect(wrapper.find('input[name="city"]')).toBeTruthy();
    expect(wrapper.find('input[name="npOffice"]')).toBeTruthy();
  });

  it('Should update Nova poshta office input on change', () => {
    updateField(wrapper.find('input[name="npOffice"]'), 'npOffice', validNpOffice);
    expect(wrapper.find('input[name="npOffice"]').props().value).toEqual(validNpOffice);
  });

  it('Should trigger submit on submit clicked with valid form', async () => {
    updateField(wrapper.find('input[name="npOffice"]'), '', validNpOffice);

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
          npOffice: validNpOffice,
          city: validCity,
          saveMyData: false
        }, expect.any(Function));
    }, 3000);
  });

  it('Should not trigger submit on submit clicked with invalid npOffice', async () => {
    updateField(wrapper.find('input[name="npOffice"]'), 'npOffice', invalidNpOffice);

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

  it('switch function renders proper regions by index', () => {
    render(<Provider store={store}><Sort values={regions}/></Provider>);
    const options = document.querySelectorAll('option');
    expect(options.length).toBe(Object.values(regions).length);
    expect(options[0].value).toBe(regions.KYIV);
  });
});