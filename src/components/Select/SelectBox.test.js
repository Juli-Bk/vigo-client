import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectSimple from './SelectBox';

const handler = jest.fn();
const testLabel = 'label';
const testOptions = [1, 2, 3];
const testClasses = {
  form: 'form',
  select: 'select'
};

describe('select testing', () => {
  const array = testOptions.map(value => {
    return <option value={value} key={value}>{value}</option>;
  });

  it('should render proper label', function () {
    render(
      <SelectSimple
        options={[1, 2, 3]}
        value={1}
        handleChange={handler}
        label={testLabel}
        classes={testClasses}
      />);
    const label = document.querySelector('label');
    expect(label.textContent).toBe(testLabel);
  });
  it('should render proper options amount', function () {
    render(
      <SelectSimple
        options={array}
        value={1}
        handleChange={handler}
        label={testLabel}
        classes={testClasses}
      />);
    const options = document.querySelectorAll('option');
    expect(options.length).toBe(testOptions.length);
  });

  it('should call handler on select change', function () {
    render(
      <SelectSimple
        options={array}
        value={1}
        handleChange={handler}
        label={testLabel}
        classes={testClasses}
      />);
    const select = document.querySelector('select');
    expect(select).toBeInTheDocument();
    fireEvent.change(select);
    expect(handler).toHaveBeenCalled();
  });
});