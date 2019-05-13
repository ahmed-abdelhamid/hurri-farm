import axios from 'axios';
import { LOGIN, LOGOUT, STORE_USER } from './types';

export const storeUser = userData => ({ type: STORE_USER, payload: userData });

export const login = (mobile, password) => async dispatch => {
  try {
    const response = await axios.post(
      `${
        process.env.REACT_APP_LOCAL_IP
      }/account/accountlogin?mobile=${mobile}&password=${password}`
    );
    localStorage.setItem('adminPlantGateId', response.data.accountid);
    dispatch({ type: LOGIN, payload: response.data });
  } catch (e) {
    throw new Error('Login Failed');
  }
};

export const logout = () => async dispatch => {
  try {
    localStorage.removeItem('adminPlantGateId');
    dispatch({ type: LOGOUT });
  } catch (e) {}
};

export const editUserData = (
  { username, password, mobile },
  id
) => async dispatch => {
  try {
    const response = await axios.get(
      `${
        process.env.REACT_APP_LOCAL_IP
      }/account/editaccount?username=${username}&mobile=${mobile}&accountid=${id}${
        password ? `&password=${password}` : ''
      }`
    );
    dispatch({ type: STORE_USER, payload: response.data });
  } catch (e) {}
};
