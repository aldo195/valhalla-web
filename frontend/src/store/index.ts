import {configureStore as devConfigureStore} from './configureStore.dev';
import {configureStore as prodConfigureStore} from './configureStore.prod';

export const store = process.env.NODE_ENV !== 'production' ? devConfigureStore() : prodConfigureStore();
