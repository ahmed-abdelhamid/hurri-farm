import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  orders: ordersReducer
});
