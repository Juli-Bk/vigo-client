import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Divider } from '@material-ui/core';
import useStyles from './SideMenuStyle';

const data = ['New in', 'Clothing', 'Shoes', 'Accessories', 'Activewear', 'Face + Body'];

const SideMenu = () => {
  // const {data} = props;
  const classes = useStyles();
  
  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ [anchor]: open });
  };
  const anchor = 'left';

  const list = (anchor) => (
    <div
      className={classes.list}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>

      <List>
        {data.map((text, index) => (
          <div key={index}>
            <ListItem key={text}>
              <ListItemText primary={text} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <IconButton className={classes.menuIcon} onClick={toggleDrawer(anchor, true)}>
          <MenuIcon />
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

export default React.memo(SideMenu);
