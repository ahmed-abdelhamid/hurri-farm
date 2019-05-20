import { GET_ALL_ORDERS, CLEAN_ORDERS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return [...action.payload];
    case CLEAN_ORDERS:
      return [];
    default:
      return state;
  }
};
