import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StylesProvider, ThemeProvider} from '@material-ui/styles';

import './App.scss';
import theme from './mainTheme';
import Footer from './containers/Footer/Footer';
import {getCategories} from './redux/actions/categories';
import {getUserData} from './redux/actions/user';
import { changeShoppingCart, getUserShopCart } from './redux/actions/shopCart';
import ModalSize from './components/ModalSelectSize/ModalSelectSize';
import { getStorageData } from './helpers/helpers';
import { changeWishList } from './redux/actions/wishlist';

function App (props) {
  const {
    getUserData,
    getCategories,
    getUserShopCart,
    isModalSizeOpen,
    changeShoppingCart,
    changeWishList
  } = props;

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      getCategories();
      getUserData();
      getUserShopCart();
      changeShoppingCart(getStorageData('shoppingCart'));
      changeWishList();
    }
    return () => {
      isCanceled = true;
    };
  }, [changeShoppingCart, getCategories, getUserData, getUserShopCart, changeWishList]);

  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AppRoutes/>
          {isModalSizeOpen && <ModalSize/>}
          <Footer/>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}

App.propTypes = {
  getUserData: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  isModalSizeOpen: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    isModalSizeOpen: store.isModalSizeOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(getUserData()),
    getCategories: () => dispatch(getCategories()),
    getUserShopCart: () => dispatch(getUserShopCart()),
    changeShoppingCart: data => dispatch(changeShoppingCart(data)),
    changeWishList: () => dispatch(changeWishList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
