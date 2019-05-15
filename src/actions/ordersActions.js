import _ from 'lodash';
import database from '../firebase/firebase';
import { GET_ALL_ORDERS } from './types';

export const getAllOrders = () => async dispatch => {
  await database.ref().on('value', snapshot => {
    const users = [];
    const orders = [];

    snapshot.forEach(childSnapshot => {
      users.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    users.map(user => {
      if (user.orders) {
        _.map(user.orders, (order, orderId) => {
          orders.push({
            userId: user.id,
            userName: user.userInfo.name,
            userPhoneNumber: user.userInfo.phoneNumber,
            id: orderId,
            ...order
          });
        });
      }
    });

    dispatch({ type: GET_ALL_ORDERS, payload: orders });
  });
};
