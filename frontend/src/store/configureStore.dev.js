import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../reducers/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';

const configureStore = (state = {}) => {
  const store = createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(thunk))
  );

  // We can hook to webpack's API to replace the root reducer of the store, which will propagate back all the actions.
  if (module.hot) {
    module.hot.accept("../reducers/rootReducer", () =>
      store.replaceReducer(rootReducer)
    );
  }

  return store;
};

export {configureStore};
