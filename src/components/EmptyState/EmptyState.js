import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Box, makeStyles} from '@material-ui/core';
import {colors} from '../../styles/colorKit';
import {fonts } from '../../styles/fonts/fontsKit';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50vh',
    fontFamily: fonts.f3,
    color: colors.noticeColor,
    fontSize: '1.5rem'
  },
  text: {
    fontSize: '1.5rem'
  },
  linkText: {
    textDecoration: 'underline !important',
    color: colors.noticeColor
  }
});

const EmptyState = (props) => {
  const {text, linkText} = props;
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography className={classes.text}>{text}</Typography>
      <Link to='/products'
        className={classes.linkText}>{linkText}</Link>
    </Box>
  );
};

EmptyState.propTypes = {
  text: PropTypes.any.isRequired,
  linkText: PropTypes.any
};

export default React.memo(EmptyState);