export default (orders, { filterBy }) => {
  if (filterBy) {
    orders = orders.filter(order => {
      if (filterBy === 'delivery') {
        return order.delivery_option === true;
      } else {
        return order.delivery_option === false;
      }
    });
  }

  return orders;
};
