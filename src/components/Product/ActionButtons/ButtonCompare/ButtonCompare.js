import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import PropTypes from 'prop-types';

const ButtonCompare = (props) => {
  const {classes, id, addToCompare, label} = props;
  return (
    label
      ? <IconButton aria-label={label} onClick={() => addToCompare(id)}>
        <Done className={classes.icon}/>
        <Typography variant='body2' className={classes.label}>{label}</Typography>
      </IconButton>
      : <Done className={classes.icon} onClick={() => addToCompare(id)}/>
  );
};

ButtonCompare.propTypes = {
  classes: PropTypes.object.isRequired,
  addToCompare: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default React.memo(ButtonCompare);