import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import {connect} from 'react-redux';

import {StylesProvider, ThemeProvider} from '@material-ui/styles';

import styles from './App.scss';
import theme from './mainTheme';
import Footer from './containers/Footer/Footer';
import AjaxUtils from './ajax';
import { changeWishList } from './redux/actions/actions';
import { getStorageData } from './helpers/helpers';
import { getJWTfromCookie } from './ajax/common/helper';

function App (props) {
  const {changeWishList, token} = props;

  useEffect(() => {
    AjaxUtils.Categories.getAllCategories();

    if (token || getJWTfromCookie()) {
      AjaxUtils.Users.getUser()
        .then(result => {
          AjaxUtils.WishLists.getUserWishList(result._id)
            .then(result => {
              console.log(result);
            });
        });
    }
    changeWishList(getStorageData('wishList'));
  }, [changeWishList, token]);

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
    changeWishList: data => dispatch(changeWishList(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
