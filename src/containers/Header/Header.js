import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Box, Container, Grid, IconButton, Toolbar} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AppBar from '@material-ui/core/AppBar';
import useStyles from './headerStyle';
import theme from './headerTheme';
import {ScaleBalance } from 'mdi-material-ui';
import Logo from '../../components/Logo/Logo';
import NestedMenu from '../../components/NestedMenu/NestedMenu';
import SearchBar from '../../components/SearchBar/SearchBar';
import SideMenu from '../../components/SideMenu/SideMenu';
import ModalLogin from '../../components/ModalLogin/ModalLogin';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/styles';
import { changeWishList, getUserWishList } from '../../redux/actions/wishlist';
import { changeShoppingCart, getUserShopCart } from '../../redux/actions/shopCart';
import {changeCompareList, setGuestData} from '../../redux/actions/actions';
import {connect} from 'react-redux';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import ModalSize from '../../components/ModalSelectSize/ModalSelectSize';
import SnackbarMessage from '../../components/SnackbarMessage/SnackbarMessage';
import ModalRestorePassword from '../../components/ModalRestorePassword/ModalRestorePassword';

const Header = (props) => {
  const {
    getUserShopCart,
    getUserWishList,
    isModalSizeOpen,
    changeShoppingCart,
    changeWishList,
    shoppingCart,
    compareList,
    wishList,
    userIsLoggedIn,
    snackMessage,
    changeCompareList,
    setGuestData
  } = props;
  const classes = useStyles();

  const getData = useCallback(() => {
    getUserWishList();
    getUserShopCart();
    changeShoppingCart();
    changeWishList();
    changeCompareList();
    setGuestData();
  }, [changeCompareList, changeShoppingCart, changeWishList, getUserShopCart, getUserWishList, setGuestData]);

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      getData();
    }
    return () => {
      isCanceled = true;
    };
  }, [getData]);

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
                  <Link to='/wishlist' className={classes.link}>
                    <IconButton aria-label="starIcon" className={classes.starIcon}>
                      <FavoriteBorderIcon/>
                    </IconButton>
                    {wishList.length
                      ? <span className={classes.digit}>{wishList.length}</span>
                      : null}
                  </Link>
                  <Link to='/cart' className={classes.link}>
                    <IconButton aria-label="shoppingBag" className={classes.shoppingBag}>
                      <LocalMallOutlinedIcon/>
                    </IconButton>
                    {shoppingCart.length
                      ? <span className={classes.digit}>{shoppingCart.length}</span>
                      : null}
                  </Link>
                  <Link to='/compare' className={classes.link}>
                    <IconButton aria-label="compare" className={classes.compareIcon}>
                      <ScaleBalance/>
                    </IconButton>
                    {compareList.length
                      ? <span className={classes.digit}>{compareList.length}</span>
                      : null}
                  </Link>
                  {userIsLoggedIn && <ProfileMenu/>}
                  <ModalLogin/>
                  <ModalRestorePassword/>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Grid>
        {!isMobile && <NestedMenu/>}
        {isModalSizeOpen && <ModalSize/>}
        {snackMessage.isOpen && <SnackbarMessage/>}
      </Grid>
    </ThemeProvider>
  );
};

Header.propTypes = {
  userIsLoggedIn: PropTypes.bool.isRequired,
  isModalSizeOpen: PropTypes.bool.isRequired,
  shoppingCart: PropTypes.array.isRequired,
  wishList: PropTypes.array.isRequired,
  compareList: PropTypes.array.isRequired,
  snackMessage: PropTypes.object.isRequired,
  getUserWishList: PropTypes.func.isRequired,
  getUserShopCart: PropTypes.func.isRequired,
  changeShoppingCart: PropTypes.func.isRequired,
  changeWishList: PropTypes.func.isRequired,
  changeCompareList: PropTypes.func.isRequired,
  setGuestData: PropTypes.func.isRequired
};

const mapStoreToProps = store => {
  return {
    userIsLoggedIn: store.stateFlags && store.stateFlags.userIsLoggedIn,
    isModalSizeOpen: store.modals && store.modals.isModalSizeOpen,
    shoppingCart: store.userChoice && store.userChoice.shoppingCart,
    wishList: store.userChoice && store.userChoice.wishList,
    snackMessage: store.snackMessage,
    compareList: store.userChoice && store.userChoice.compareList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserWishList: () => dispatch(getUserWishList()),
    getUserShopCart: () => dispatch(getUserShopCart()),
    changeShoppingCart: () => dispatch(changeShoppingCart()),
    changeWishList: () => dispatch(changeWishList()),
    changeCompareList: () => dispatch(changeCompareList()),
    setGuestData: () => dispatch(setGuestData())
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Header);
