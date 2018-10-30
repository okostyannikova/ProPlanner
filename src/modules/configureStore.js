import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const history = createBrowserHistory();
const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk));
const store = createStore(connectRouter(history)(rootReducer), enhancer);

export default store;
