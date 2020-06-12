import React from 'react';
import { Link } from 'react-router-dom';
import {Box, Container, Grid, IconButton, Toolbar} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AppBar from '@material-ui/core/AppBar';
import useStyles from './headerStyle';
import theme from './headerTheme';

import Logo from '../../components/Logo/Logo';
import NestedMenu from '../../components/NestedMenu/NestedMenu';
import SearchBar from '../../components/SearchBar/SearchBar';
import SideMenu from '../../components/SideMenu/SideMenu';
import ModalLogin from '../../components/ModalLogin/ModalLogin';

const Header = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <AppBar position="static" className={classes.appBar}>
            <Container xs={12}>
              <Toolbar variant="dense" disableGutters={true} className={classes.toolBar}>
                <Box className={classes.burgerMenuBlock}>
                  <SideMenu/>
                  <Logo description={'Vigo Shop'}/>
                </Box>
                <Box className={classes.headerIconsBlock}>
                  <SearchBar/>
                  <Link to='/wishlist'>
                    <IconButton aria-label="starIcon" className={classes.starIcon}>
                      <FavoriteBorderIcon/>
                    </IconButton>
                  </Link>

                  <IconButton aria-label="shoppingBag" className={classes.shoppingBag}>
                    {/* todo should open shopping card page */}
                    <LocalMallOutlinedIcon/>
                  </IconButton>
                  <ModalLogin />
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Grid>
        <NestedMenu/>
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(Header);
