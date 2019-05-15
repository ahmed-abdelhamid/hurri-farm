import { DELIVERY_ONLY, RECIEVE_ONLY, ALL } from '../actions/types';

const defaultState = { filterBy: '', sortBy: '' };

export default (state = defaultState, action) => {
  switch (action.type) {
    case ALL:
      return { ...state, filterBy: '' };
    case DELIVERY_ONLY:
      return { ...state, filterBy: 'delivery' };
    case RECIEVE_ONLY:
      return { ...state, filterBy: 'recieve' };
    default:
      return state;
  }
};
