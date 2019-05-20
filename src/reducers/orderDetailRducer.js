import { GET_ORDER_BY_ID, REMOVE_ORDER_DETAIL } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case GET_ORDER_BY_ID:
      return action.payload;
    case REMOVE_ORDER_DETAIL:
      return null;
    default:
      return state;
  }
};
