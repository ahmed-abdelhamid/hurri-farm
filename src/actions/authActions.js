import database, { firebase } from '../firebase/firebase';
import { LOGIN, LOGOUT, STORE_USER, EDIT_USER } from './types';

export const storeUser = userData => ({
  type: STORE_USER,
  payload: userData
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

    const { uid, displayName } = response.user;
    const { phoneNumber } = snapshot.val().userInfo;
    const userData = {
      userId: uid,
      role: snapshot.val().userInfo.role,
      displayName,
      phoneNumber,
      email
    };

    dispatch({ type: LOGIN, payload: userData });
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

export const editUserData = (
  { displayName, newPassword, oldPassword, phoneNumber, email },
  id
) => async dispatch => {
  const user = firebase.auth().currentUser;
  const emailCredentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    oldPassword
  );

  try {
    await user.updateProfile({ displayName });
    await database.ref(`users/${id}/userInfo`).update({ phoneNumber });
    await user.reauthenticateWithCredential(emailCredentials);
    await user.updateEmail(email);

    if (newPassword) {
      await user.updatePassword(newPassword);
    }

    dispatch({ type: EDIT_USER, payload: { displayName, phoneNumber, email } });
  } catch (e) {
    if (e.code === 'auth/wrong-password') {
      throw new Error('wrong-password');
    } else if (e.code === 'auth/email-already-in-use') {
      throw new Error('email-already-in-use');
    }
  }
};
