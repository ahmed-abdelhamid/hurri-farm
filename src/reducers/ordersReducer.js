import { GET_ALL_ORDERS, GET_ORDER_BY_ID } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return [...action.payload];
    case GET_ORDER_BY_ID:
      return [action.payload];
    default:
      return state;
  }
};
