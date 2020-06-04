import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers/rootReducer';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
const store = createStore(rootReducer, compose(applyMiddleware(thunk), devTools));

export default store;