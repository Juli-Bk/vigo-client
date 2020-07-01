import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const SelectBox = (props) => {
  const { value, handleChange, options, label, classes} = props;

  return (
    <Box>
      <label>{label}</label>
      <form className={classes.form}>
        <select
          className={classes.select}
          value={value}
          onChange={handleChange}
          id={label}
        >
          {options}
        </select>
      </form>
    </Box>
  );
};

SelectBox.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default React.memo(SelectBox);