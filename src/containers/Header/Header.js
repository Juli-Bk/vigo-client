import React from 'react';
import {Link} from 'react-router-dom';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/styles';

const Header = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery(useTheme().breakpoints.between(0, 724), {
    defaultMatches: true
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem} xs={12}>
          <AppBar position="static" className={classes.appBar} xs={12}>
            <Container xs={12}>
              <Toolbar variant="dense"
                disableGutters={true}
                className={classes.toolBar}>
                <Box className={classes.burgerMenuBlock}>
                  {isMobile && <SideMenu/>}
                  <Logo description={'Vigo Shop'}/>
                </Box>
                <Box className={classes.headerIconsBlock}>
                  <SearchBar/>
                  <Link to='/wishlist'>
                    <IconButton aria-label="starIcon" className={classes.starIcon}>
                      <FavoriteBorderIcon/>
                    </IconButton>
                  </Link>

                  <Link to='/cart'>
                    <IconButton aria-label="shoppingBag" className={classes.shoppingBag}>
                      <LocalMallOutlinedIcon/>
                    </IconButton>
                  </Link>
                  <ModalLogin/>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Grid>
        {!isMobile && <NestedMenu/>}
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(Header);
