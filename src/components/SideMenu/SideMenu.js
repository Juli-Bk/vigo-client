import React, {useMemo, useState} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import {IconButton} from '@material-ui/core';
import useStyles from './SideMenuStyle';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

function getRandomInt (min, max) {
  return Math.random() * (max - min) + min;
}

const data = [
  {
    id: getRandomInt(50, 100),
    name: 'New in',
    filter: 'new=true'
  },
  {
    id: getRandomInt(50, 100),
    name: 'Sale',
    filter: 'isOnSale=true'
  }
];

const SideMenu = (props) => {
  const {categories} = props;
  const classes = useStyles();

  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({[anchor]: open});
  };
  const anchor = 'left';

  const categoriesMenuItem = useMemo(() => categories
    .filter(category => category.level === 1)
    .map((root) => {
      const href = `/products/filter?categoryId=${root.id}`;
      return <Box component='li' className={classes.topMenuBox} key={root.id}>
        <Link className={classes.topMenuLink} to={href}>{root.name}</Link>
      </Box>;
    }), [categories, classes.topMenuBox, classes.topMenuLink]);

  const additionalLinks = data.map(item => {
    return <Box component='li' className={classes.topMenuBox} key={item.id}>
      <Link className={classes.topMenuLink} to={`/products/filter?${item.filter}`}>{item.name}</Link>
    </Box>;
  });

  const links = [].concat(categoriesMenuItem).concat(additionalLinks);

  const list = (anchor) => (
    <Box component='nav'>
      <Box
        component='ul'
        className={classes.list}
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}>
        {links}
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <IconButton className={classes.menuIcon} onClick={toggleDrawer(anchor, true)}>
          <MenuIcon/>
        </IconButton>
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}>
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

const mapStoreToProps = store => {
  return {
    categories: Array.isArray(store.categories) ? store.categories : store.categories.categories
  };
};

export default connect(mapStoreToProps)(React.memo(SideMenu));
