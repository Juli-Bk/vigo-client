import React, {useCallback} from 'react';
import {Box, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {useTheme} from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useStyles from '../SearchBar/SearchBarStyle';
import SearchField from './SearchField/SearchField';
import {connect} from 'react-redux';
import {toggleSearchBarOpen} from '../../redux/actions/actions';

const anchor = 'top';

const SearchBar = ({isSearchBarOpen, toggleSearchBarOpen}) => {
  const theme = useTheme();
  const classes = useStyles();

  const toggleDrawer = useCallback((open) => {
    toggleSearchBarOpen(open);
  }, [toggleSearchBarOpen]);

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
              onClick={() => toggleDrawer(!isSearchBarOpen)}
            >
              <SearchIcon/>
            </IconButton>
            <SwipeableDrawer
              className={classes.drawer}
              anchor={anchor}
              open={isSearchBarOpen}
              onClose={() => toggleDrawer(false)}
              onOpen={() => {}}
            >
              <Box className={classes.drawerSearchBlock}>
                <SearchField/>
              </Box>
            </SwipeableDrawer>
          </>
          : <Box className={classes.headerSearchBlock}><SearchField/></Box>
      }
    </>

  );
};

const mapStoreToProps = store => {
  return {
    isSearchBarOpen: store.isSearchBarOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSearchBarOpen: isOpen => dispatch(toggleSearchBarOpen(isOpen))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(SearchBar));
