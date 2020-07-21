import React from 'react';
import PropTypes from 'prop-types';

const SelectBox = React.forwardRef((props, ref) => {
  const {value, handleChange, options, label, classes} = props;

  return (
    <>
      <label>{label}</label>
      <form className={classes.form}>
        <select
          ref={ref}
          className={classes.select}
          value={value}
          onChange={handleChange}
          id={label}
        >
          {options}
        </select>
      </form>
    </>
  );
});

SelectBox.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default SelectBox;