import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

import {Provider} from 'react-redux';
import store from './redux/store';

import {StylesProvider, ThemeProvider} from '@material-ui/styles';

import styles from './App.scss';
import theme from './mainTheme';
import Footer from './containers/Footer/Footer';
import AjaxUtils from './ajax';

function App () {
  useEffect(() => {
    AjaxUtils.Categories.getAllCategories();
  }, []);

  return (
    <div className={styles.App}>
      <Provider store={store}>
        <BrowserRouter>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <AppRoutes/>
              <Footer/>
            </ThemeProvider>
          </StylesProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
