import _ from 'lodash';
import database from '../firebase/firebase';
import { GET_ALL_CLIENTS, CLEAR_CLIENTS } from './types';

export const getAllClients = () => dispatch => {
  database.ref().on('value', snapshot => {
    const clients = [];

    snapshot.forEach(childSnapshot => {
      const client = { id: childSnapshot.key, ...childSnapshot.val().userInfo };
      // if (childSnapshot.val().orders) {
      //   _.map(childSnapshot.val().orders, (order, orderId) => {
      //     if (order.delivery_option === true) {
      //       console.log(order, orderId);
      //       // client.location = order.delivery_details.location;
      //       return;
      //     }
      //   });
      // }

      clients.push(client);
    });

    dispatch({ type: GET_ALL_CLIENTS, payload: clients });
  });
};

export const clearClients = () => {
  return { type: CLEAR_CLIENTS };
};
