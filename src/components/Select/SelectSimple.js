import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const SelectSimple = (props) => {
  const { value, handleChange, options, label, classes } = props;

  return (
    <Box className={classes.form}>
      <label>{label}</label>
      <form>
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

SelectSimple.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default React.memo(SelectSimple);