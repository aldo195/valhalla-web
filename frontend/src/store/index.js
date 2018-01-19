import {configureStore as prodConfigureStore} from './configureStore.prod';
import {configureStore as devConfigureStore} from './configureStore.dev';

let store;

if (process.env.NODE_ENV !== 'production') {
  store = devConfigureStore();
} else {
  store = prodConfigureStore();
}

export {store};
