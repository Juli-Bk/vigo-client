import React, {useEffect, useCallback} from 'react';
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

function App (props) {
  const {
    getUserData,
    getCategories
  } = props;

  const getData = useCallback(() => {
    getCategories();
    getUserData();
  }, [getCategories, getUserData]);

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      getData();
    }
    return () => {
      isCanceled = true;
    };
  }, [getData]);

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
  getUserData: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
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
