import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ViewAs from './ViewAs';
import {Provider} from 'react-redux';
import store from '../../redux/store';
import { rootReducer } from '../../redux/reducers/rootReducer';
import Actions from '../../redux/constants/constants';

const testData = {
  label: true
};

const mockWindowProperty = (property, value) => {
  const {[property]: originalProperty} = window;
  delete window[property];
  beforeAll(() => {
    Object.defineProperty(window, property, {
      configurable: true,
      writable: true,
      value
    });
  });
  afterAll(() => {
    window[property] = originalProperty;
  });
};

describe('viewAs component testing', () => {
  mockWindowProperty('localStorage', {
    setItem: jest.fn((key, value) => window.localStorage[key] = value),
    getItem: jest.fn(key => window.localStorage[key]),
    removeItem: jest.fn(key => window.localStorage[key] = null)
  });

  it('viewAs label rendered properly', () => {
    const viewAs = render(<Provider store={store}><BrowserRouter><ViewAs label={testData.label}/></BrowserRouter></Provider>);
    const label = viewAs.getByText('View as:');
    expect(label).toBeInTheDocument();
  });
  it('viewAs component render properly', () => {
    const viewAs = render(<Provider store={store}><BrowserRouter><ViewAs label={testData.label}/></BrowserRouter></Provider>);
    const btnGroup = viewAs.getByTestId('toggleButtonGroup');
    expect(btnGroup).toBeInTheDocument();
  });

  it('redux store work properly', () => {
    const state = rootReducer({
      productsOptions: { view: 'list' }
    }, {
      type: Actions.SET_CHOSEN_VIEW,
      payload: 'module'
    }
    );
    expect(state.productsOptions.view).toBe('module');
  });

  it('sets view to localStorage properly', () => {
    window.localStorage.setItem('shopCart', 'module');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('shopCart', 'module');
  });
});