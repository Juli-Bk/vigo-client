import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ButtonCompare = (props) => {
  const {classes, id, addToCompare, label, compareList} = props;
  const className = compareList.includes(id) ? classes.iconChosen : classes.icon;
  const labelClass = compareList.includes(id) ? classes.labelChosen : classes.label;
  return (
    label
      ? <IconButton aria-label={label}
        onClick={() => addToCompare(id)}
        disableFocusRipple
        disableRipple>
        <Done className={className}/>
        <Typography variant='body2' className={labelClass}>{label}</Typography>
      </IconButton>
      : <Done className={className} onClick={() => addToCompare(id)}/>
  );
};

ButtonCompare.propTypes = {
  classes: PropTypes.object.isRequired,
  addToCompare: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string
};

const mapStateToProps = store => {
  return {
    compareList: store.compareList
  };
};

export default connect(mapStateToProps)(React.memo(ButtonCompare));