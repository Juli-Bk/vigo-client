import React from 'react';
import PropTypes from 'prop-types';

import {Box, Typography} from '@material-ui/core';
import useStyles from '../IconLabel/IconLabelStyle';

const IconLabel = (props) => {
  const {label, Component} = props;
  const styles = useStyles();
  return (
    <Box className={styles.formIcon} >
      <Component className={styles.icon}/>
      <Typography>{label}</Typography>
    </Box>
  );
};

IconLabel.propTypes = {
  label: PropTypes.string.isRequired,
  Component: PropTypes.object.isRequired
};
export default React.memo(IconLabel);