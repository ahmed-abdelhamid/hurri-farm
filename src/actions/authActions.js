import database, { firebase } from '../firebase/firebase';
import { LOGIN, LOGOUT, STORE_USER } from './types';

export const storeUser = (userId, role) => ({
  type: STORE_USER,
  payload: { userId, role }
});

export const login = (email, password) => async dispatch => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const snapshot = await database
      .ref(`/users/${response.user.uid}`)
      .once('value');
    if (!snapshot.val() || !snapshot.val().userInfo.isAdmin) {
      throw new Error();
    }

    dispatch({
      type: LOGIN,
      payload: { userId: response.user.uid, role: snapshot.val().userInfo.role }
    });
  } catch (e) {
    throw new Error('Login Failed');
  }
};

export const logout = () => async dispatch => {
  try {
    await firebase.auth().signOut();
    dispatch({ type: LOGOUT });
  } catch (e) {}
};

// export const editUserData = (
//   { username, password, mobile },
//   id
// ) => async dispatch => {
//   try {
//     const response = await axios.get(
//       `${
//         process.env.REACT_APP_LOCAL_IP
//       }/account/editaccount?username=${username}&mobile=${mobile}&accountid=${id}${
//         password ? `&password=${password}` : ''
//       }`
//     );
//     dispatch({ type: STORE_USER, payload: response.data });
//   } catch (e) {}
// };
