import { LOGIN, LOGOUT, STORE_USER, EDIT_USER } from '../actions/types';

const initialState = { isSignedIn: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
    case LOGIN:
      return {
        isSignedIn: true,
        ...action.payload
      };
    case EDIT_USER:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
      return { isSignedIn: false };
    default:
      return state;
  }
};
