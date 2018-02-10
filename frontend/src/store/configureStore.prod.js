import {applyMiddleware, compose, createStore} from 'redux';
import {rootReducer} from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const configureStore = (state = {}) => {
  return createStore(rootReducer, state, compose(applyMiddleware(thunk)));
};

export {configureStore};
