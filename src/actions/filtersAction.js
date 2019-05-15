import { DELIVERY_ONLY, RECIEVE_ONLY, ALL } from './types';

export const getDeliveryOption = option => {
  if (option === 'delivery') {
    return { type: DELIVERY_ONLY };
  } else if (option === 'recieve') {
    return { type: RECIEVE_ONLY };
  } else {
    return { type: ALL };
  }
};
