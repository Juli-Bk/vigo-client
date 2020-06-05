import React from 'react';
import {Box, Container, Grid, IconButton, Toolbar} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AppBar from '@material-ui/core/AppBar';

import useStyles from './headerStyle';
import theme from './headerTheme';

import ButtonLink from '../../components/ButtonLink/ButtonLink';
import PersonButton from '../../components/PersonButton/PersonButton';
import SideMenu from '../../components/SideMenu/SideMenu';
import Logo from '../../components/Logo/Logo';
import NestedMenu from '../../components/NestedMenu/NestedMenu';
import SearchBar from '../../components/SearchBar/SearchBar';

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
                  <IconButton aria-label="starIcon" className={classes.starIcon}>
                    {/* todo should open favorites card page */}
                    <FavoriteBorderIcon/>
                  </IconButton>

                  <IconButton aria-label="shoppingBag" className={classes.shoppingBag}>
                    {/* todo should open shopping card page */}
                    <LocalMallOutlinedIcon/>
                  </IconButton>

                  <PersonButton classIncome={classes.personIcon}/>
                  <Box className={classes.loginControls}>
                    {/* todo not link, it is button which should open modal window with login form */}
                    <ButtonLink name="Sign In" path="/login"/>
                  </Box>
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
