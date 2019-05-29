import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import OrderState from '../../layouts/OrderState/OrderState';

const DetailsTable = ({ title, keys, details }) => {
  keys.forEach(key => {
    if (key.name === 'delivery_option') {
      details.delivery_option = details.delivery_option
        ? 'التوصيل عن طريق المندوب'
        : 'الإستلام من الفرع';
    }

    if (key.name === 'delivery_person') {
      details.delivery_person = details.delivery_person.name;
    }

    if (key.name === 'order_status') {
      const { delivery_option, id, order_status, userId } = details;
      const order = { delivery_option, id, order_status, userId };
      details.order_status = <OrderState order={order} />;
    }

    if (details[key.name] === true) {
      details[key.name] = 'نعم';
    }

    if (details[key.name] === false) {
      details[key.name] = 'لا';
    }
  });

  return (
    <div>
      {title && <Header as="h2" content={title} />}
      <Table definition>
        <Table.Body>
          {keys.map((key, index) => (
            <Table.Row key={index}>
              <Table.Cell collapsing>{key.translate}</Table.Cell>
              {key.name === 'location' ? (
                <Table.Cell>{`${details[key.name].x}, ${
                  details[key.name].x
                }`}</Table.Cell>
              ) : (
                <Table.Cell>{details[key.name]}</Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DetailsTable;
