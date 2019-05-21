import { GET_ALL_CLIENTS, CLEAR_CLIENTS } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return action.payload;
    case CLEAR_CLIENTS:
      return null;
    default:
      return state;
  }
};
