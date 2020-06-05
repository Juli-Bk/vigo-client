import React, {useCallback, useState} from 'react';
import {Box, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {useTheme} from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from '../SearchBar/SearchBarStyle';
import SearchField from './SearchField/SearchField';

const anchor = 'top';

const SearchBar = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [state, setState] = useState({
    top: false
  });

  const toggleDrawer = useCallback((anchor, open) => () => {
    setState({top: open});
  },
  []);

  const isMobile = useMediaQuery(theme.breakpoints.between(0, 724), {
    defaultMatches: true
  });

  return (
    <>
      {
        isMobile
          ? <>
            <IconButton
              className={classes.searchIcon}
              onClick={toggleDrawer(anchor, true)}>
              <SearchIcon/>
            </IconButton>
            <SwipeableDrawer
              className={classes.drawer}
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}>
              <Box className={classes.drawerSearchBlock}><SearchField/></Box>
            </SwipeableDrawer>
          </>
          : <Box className={classes.headerSearchBlock}><SearchField/></Box>
      }
    </>

  );
};

export default React.memo(SearchBar);