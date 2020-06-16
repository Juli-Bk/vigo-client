import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StylesProvider, ThemeProvider} from '@material-ui/styles';

import theme from './mainTheme';
import Footer from './containers/Footer/Footer';
import AjaxUtils from './ajax';
import {changeWishList, setUser, changeShoppingCart} from './redux/actions/actions';
import {getStorageData, integrateData, integrateCart} from './helpers/helpers';
import {getUserIdFromCookie} from './ajax/common/helper';

function App (props) {
  const {changeWishList, token, setUser, changeShoppingCart} = props;

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
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
    }
    return () => {
      isCanceled = true;
    };
  }, [changeWishList, setUser, changeShoppingCart, token]);

  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AppRoutes/>
          <Footer/>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}

App.propTypes = {
  token: PropTypes.string,
  changeWishList: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

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
