import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StylesProvider, ThemeProvider} from '@material-ui/styles';

import './App.scss';
import theme from './mainTheme';
import Footer from './containers/Footer/Footer';
import { getCategories} from './redux/actions/categories';
import {getUserData} from './redux/actions/user';
import AjaxUtils from './ajax';
import {changeWishList, setUser, changeShoppingCart} from './redux/actions/actions';
import {getStorageData, integrateData} from './helpers/helpers';
import {integrateCart} from './pages/ShoppingCart/cartHelpers';
import {getUserIdFromCookie} from './ajax/common/helper';
import ModalSize from './components/ModalSelectSize/ModalSelectSize';

function App (props) {
  const {
    getUserData,
    getCategories
  } = props;
  const {changeWishList, token, setUser, changeShoppingCart, isModalSizeOpen} = props;

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      getCategories();
      getUserData();
    }
    return () => {
      isCanceled = true;
    };
  }, [getCategories, getUserData]);

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
  getUserData: PropTypes.func.isRequired
  token: PropTypes.string,
  changeWishList: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    token: store.token,
    isModalSizeOpen: store.isModalSizeOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(getUserData()),
    getCategories: () => dispatch(getCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
