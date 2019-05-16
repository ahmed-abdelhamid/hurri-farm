import _ from 'lodash';
import database from '../firebase/firebase';
import { GET_ALL_ORDERS, GET_ORDER_BY_ID } from './types';

export const getAllOrders = (type = undefined) => async dispatch => {
  await database.ref().on('value', snapshot => {
    const users = [];
    const orders = [];

    snapshot.forEach(childSnapshot => {
      users.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    // eslint-disable-next-line array-callback-return
    users.map(user => {
      if (user.orders) {
        _.map(user.orders, (order, orderId) => {
          orders.push({
            userId: user.id,
            userName: user.userInfo.name,
            userPhoneNumber: user.userInfo.phoneNumber,
            id: orderId,
            delivery_option: order.delivery_option,
            order_status: order.order_status
          });
        });
      }
    });

    dispatch({ type: GET_ALL_ORDERS, payload: orders });
  });
};

export const getOrderById = (orderId, userId) => async dispatch => {
  await database.ref(`${userId}/orders/${orderId}`).on('value', snapshot => {
    const order = { id: snapshot.key, ...snapshot.val() };

    dispatch({ type: GET_ORDER_BY_ID, payload: order });
  });
};
