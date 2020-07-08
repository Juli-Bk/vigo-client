import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import ButtonCompare from './ButtonCompare';
import { fireEvent, render } from '@testing-library/react';

const testClasses = { testBtn: 'testBtn' };
const testId = '2345676udfghj';
const handler = jest.fn();
const testLabel = 'label';

describe('Button Compare testing', () => {
  it('should not render text if not label provided', () => {
    render(<Provider store={store}>
      <ButtonCompare classes={testClasses} id={testId} addToCompare={handler}/>
    </Provider>);
    expect(document.querySelector('p')).not.toBeInTheDocument();
  });
  it('should render text if not label provided', () => {
    render(<Provider store={store}>
      <ButtonCompare classes={testClasses} id={testId} addToCompare={handler} label={testLabel}/>
    </Provider>);
    expect(document.querySelector('p')).toBeInTheDocument();
  });
  it('on button click handler is called', () => {
    render(<Provider store={store}>
      <ButtonCompare classes={testClasses} id={testId} addToCompare={handler}/>
    </Provider>);
    const btn = document.querySelector('svg');
    fireEvent.click(btn);
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(testId);
  });
  it('on label click handler is called', () => {
    const button = render(<Provider store={store}>
      <ButtonCompare classes={testClasses} id={testId} addToCompare={handler} label={testLabel}/>
    </Provider>);
    const label = button.getByText(testLabel);
    fireEvent.click(label);
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(testId);
  });
});