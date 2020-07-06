import React, {useCallback, useState} from 'react';
import { IconButton, ThemeProvider } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useStyles from '../SideBar/SideBarStyle';
import FiltersTree from '../FiltersTree/FiltersTree';
import {useTheme} from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import customTheme from './SideBarTheme';
import FilterPrice from '../FilterPrice/FilterPrice';
import CancelButton from '../CancelButton/CancelButton';

const anchor = 'right';

const SideBar = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [state, setState] = useState({
    right: false
  });

  const toggleDrawer = useCallback((anchor, open) => () => {
    setState({right: open});
  },
  []);

  const isMobile = useMediaQuery(theme.breakpoints.between(0, 724), {
    defaultMatches: true
  });

  return (
    <>
      {
        isMobile
          ? <ThemeProvider theme={customTheme}>
            <IconButton
              className={classes.menuIcon}
              onClick={toggleDrawer(anchor, true)}>
              <ArrowBackIosIcon/>
            </IconButton>
            <SwipeableDrawer
              className={classes.drawer}
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}>
              <CancelButton/>
              <FilterPrice/>
              <FiltersTree/>
            </SwipeableDrawer>
          </ThemeProvider>
          : <>
            <CancelButton/>
            <FilterPrice/>
            <FiltersTree/>
          </>
      }
    </>

  );
};

export default React.memo(SideBar);