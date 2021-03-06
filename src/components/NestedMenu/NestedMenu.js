import React, {useCallback, useMemo, useRef, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';
import useStyles from './NestedMenuStyle';
import theme from './NestedMenuTheme';
import {Container, ThemeProvider} from '@material-ui/core';
import MouseAwayListener from '../MouseAwayListener/MouseAwayListener';
import {toggleMenuOpen} from '../../redux/actions/actions';
import MenuPanel, {getMenuLink} from '../MenuPanel/MenuPanel';
import VerticalSubMenu from '../VerticalSubMenu/VerticalSubMenu';

const NestedMenu = (props) => {
  const {categories, isMenuOpen, toggleMenuOpen} = props;

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchor] = useState(useRef());
  const ref = useRef();

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
    setAnchor(ref.current);
    toggleMenuOpen(true);
  },
  [toggleMenuOpen]);

  const handlePopoverOpen = useCallback(() => {
    setAnchor(ref.current);
    toggleMenuOpen(true);
  }, [toggleMenuOpen]);

  const handlePopoverClose = useCallback(() => {
    toggleMenuOpen(false);
  }, [toggleMenuOpen]);

  const links = useMemo(() => categories.map((root, index) => {
    return getMenuLink(root, index, classes.topMenuLabel);
  }), [categories, classes.topMenuLabel]);

  const subLinks = useMemo(() => categories.map((root, index) => {
    return <MenuPanel
      component='li'
      containerClassName={classes.tabPanelShadow}
      value={value}
      index={index}
      key={root.id}>
      {
        <VerticalSubMenu categories={root.children}/>
      }
    </MenuPanel>;
  }), [categories, classes.tabPanelShadow, value]);

  return (
    <ThemeProvider theme={theme}>
      <Container component='nav' className={classes.root} xs={12}>
        <MouseAwayListener onMouseAway={handlePopoverClose}>
          <Box component='ul'
            className={classes.tabBox}
            bgcolor={theme.palette.background}
            ref={ref}
          >
            <Tabs
              className={classes.topMenuItemsPanel}
              component='li'
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav menu"
              onMouseEnter={handlePopoverOpen}
            >
              {links}
            </Tabs>
            <Popper
              className={classes.popper}
              id='popper-id'
              open={isMenuOpen}
              placement="bottom-end"
              anchorEl={anchorEl}
              transition
              disablePortal
            >
              {subLinks}
            </Popper>
          </Box>
        </MouseAwayListener>
      </Container>
    </ThemeProvider>
  );
};

NestedMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenuOpen: PropTypes.func.isRequired
};

const mapStoreToProps = store => {
  return {
    categories: Array.isArray(store.categories) ? store.categories : store.categories.categories,
    isMenuOpen: store.stateFlags && store.stateFlags.isMenuOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMenuOpen: isOpen => dispatch(toggleMenuOpen(isOpen))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(React.memo(NestedMenu));
