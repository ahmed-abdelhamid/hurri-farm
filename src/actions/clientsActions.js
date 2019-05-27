import _ from 'lodash';
import database from '../firebase/firebase';
import { GET_ALL_CLIENTS, CLEAR_CLIENTS } from './types';

export const getAllClients = () => dispatch => {
  database
    .ref('/users')
    .orderByChild('userInfo/name')
    .on('value', snapshot => {
      const clients = [];

      snapshot.forEach(childSnapshot => {
        if (!childSnapshot.val().userInfo.isAdmin) {
          const client = {
            id: childSnapshot.key,
            ...childSnapshot.val().userInfo
          };
          if (childSnapshot.val().orders) {
            _.map(childSnapshot.val().orders, order => {
              if (order.delivery_option) {
                client.location = order.delivery_details.location;
              }
            });
          }

          clients.push(client);
        }
      });

      dispatch({ type: GET_ALL_CLIENTS, payload: clients });
    });
};

export const clearClients = () => ({ type: CLEAR_CLIENTS });
