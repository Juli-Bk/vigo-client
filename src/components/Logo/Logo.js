import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';

import useStyles from './LogoStyle';
import theme from './LogoTheme';

const Logo = (props) => {
  const classes = useStyles();
  const {description} = props;

  return (
    <ThemeProvider theme={theme}>
      <NavLink exact to='/' className={classes.logoTitle}>
        <Typography data-testid='logoID'>{description}</Typography>
      </NavLink>
    </ThemeProvider>
  );
};

Logo.propTypes = {
  description: PropTypes.string.isRequired
};

export default React.memo(Logo);
