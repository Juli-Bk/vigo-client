import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Box, makeStyles} from '@material-ui/core';
import {colors} from '../../styles/colorKit';
import {fonts } from '../../styles/fonts/fontsKit';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50vh',
    fontFamily: fonts.f1,
    color: colors.noticeColor
  }
});

const EmptyState = (props) => {
  const {text} = props;
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant='h5'>{text}</Typography>
    </Box>
  );
};

EmptyState.propTypes = {
  text: PropTypes.any.isRequired
};

export default React.memo(EmptyState);