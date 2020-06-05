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

function App (props) {
  const {changeWishList} = props;

  useEffect(() => {
    AjaxUtils.Categories.getAllCategories();
    changeWishList(getStorageData('wishList'));
  }, [changeWishList]);

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

const mapDispatchToProps = dispatch => {
  return {
    changeWishList: data => dispatch(changeWishList(data))
  };
};

export default connect(null, mapDispatchToProps)(App);
