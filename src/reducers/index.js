import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import ordersReducer from './ordersReducer';
import filtersReducer from './filtersReducer';
import orderDetailReducer from './orderDetailRducer';
import loadingReducer from './loadingReducer';
import clientsReducer from './clientsReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  orders: ordersReducer,
  orderDetail: orderDetailReducer,
  filters: filtersReducer,
  loading: loadingReducer,
  clients: clientsReducer,
  products: productsReducer
});
