import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import store from './redux/store';
import {Provider} from 'react-redux';
import keysLiqpay from '../src/keysConfig';
import fetchInject from 'fetch-inject';

fetchInject([
  '//static.liqpay.ua/libjs/checkout.js'
]).then(() => {
  window.LiqPayCheckoutCallback = function (LiqPayCheckout) {
    LiqPayCheckout.init(keysLiqpay)
      .on('liqpay.callback', function (data) {
      }).on('liqpay.ready', function (data) {
      }).on('liqpay.close', function (data) {
      });
  };
}).catch(error => {
  console.log(error);
});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
