import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers/rootReducer';
import keysConfig from '../keysConfig';

let store;
if (keysConfig.environment === 'development') {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
  store = createStore(rootReducer, compose(applyMiddleware(thunk), devTools));
} else {
  store = createStore(rootReducer, compose(applyMiddleware(thunk)));
}

export default store;