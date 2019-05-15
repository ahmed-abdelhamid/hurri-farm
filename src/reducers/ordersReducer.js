import { GET_ALL_ORDERS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return [...action.payload];
    default:
      return state;
  }
};
