import database from '../firebase/firebase';
import { GET_ALL_PRODUCTS, CLEAN_PRODUCTS } from './types';

export const getAllProducts = () => dispatch => {
  database.ref('/products').on('value', snapshot => {
    const products = [];

    snapshot.forEach(childSnapshot => {
      const product = {
        id: childSnapshot.key,
        ...childSnapshot.val()
      };

      products.push(product);
    });

    dispatch({ type: GET_ALL_PRODUCTS, payload: products });
  });
};

export const editProductPrice = (id, price) => async dispatch => {
  try {
    await database.ref(`/products/${id}`).update({ price });
  } catch (e) {}
};

export const cleanProducts = () => ({ type: CLEAN_PRODUCTS });
