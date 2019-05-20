import { LOADING, NOT_LOADING } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case LOADING:
      return true;
    case NOT_LOADING:
      return false;
    default:
      return state;
  }
};
