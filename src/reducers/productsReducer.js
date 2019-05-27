import { GET_ALL_PRODUCTS, CLEAN_PRODUCTS } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.payload;
    case CLEAN_PRODUCTS:
      return null;
    default:
      return state;
  }
};
