import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import {connect} from 'react-redux';

import {StylesProvider, ThemeProvider} from '@material-ui/styles';

import styles from './App.scss';
import theme from './mainTheme';
import Footer from './containers/Footer/Footer';
import AjaxUtils from './ajax';
import {changeWishList, setUser, changeShoppingCart} from './redux/actions/actions';
import {getStorageData, integrateData, integrateCart} from './helpers/helpers';
import {getUserIdFromCookie} from './ajax/common/helper';

function App (props) {
  const {changeWishList, token, setUser, changeShoppingCart} = props;

  useEffect(() => {
    AjaxUtils.Categories.getAllCategories();

    const userId = getUserIdFromCookie();
    if (userId) {
      AjaxUtils.WishLists.getUserWishList(userId)
        .then(result => {
          const wishes = result.userWishList[0];
          integrateData(wishes ? wishes.products : [], getStorageData('wishList'));
          changeWishList(getStorageData('wishList'));
        });
      AjaxUtils.ShopCart.getUserShopCart(userId)
        .then(result => {
          if (!result.message) {
            integrateCart(result.products, getStorageData('shoppingCart'));
            changeShoppingCart(getStorageData('shoppingCart'));
          }
        });
    }

    setUser(getStorageData('user'));
    changeWishList(getStorageData('wishList'));
    changeShoppingCart(getStorageData('shoppingCart'));
  }, [changeShoppingCart, changeWishList, setUser, token]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <AppRoutes/>
            <Footer/>
          </ThemeProvider>
        </StylesProvider>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = store => {
  return {
    token: store.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: data => dispatch(changeWishList(data)),
    setUser: user => dispatch(setUser(user)),
    changeShoppingCart: data => dispatch(changeShoppingCart(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
