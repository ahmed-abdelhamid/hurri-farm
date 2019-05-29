import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Table,
  Message,
  Menu,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { getAllOrders, getDeliveryOption, cleanOrders } from '../../../actions';
import { TABLE_HEADERS, MENU_ITEMS } from './fixtures';
import selectOrders from '../../../helperFunctions/selectors';
import OrderState from '../../layouts/OrderState/OrderState';

const Orders = ({
  getAllOrders,
  getDeliveryOption,
  cleanOrders,
  orders,
  loading
}) => {
  const [activeItem, setActiveItem] = useState('all');

  useEffect(() => {
    getAllOrders();

    return () => cleanOrders();
  }, []);

  const handleMenuClick = ({ name }) => {
    setActiveItem(name);
    getDeliveryOption(name);
  };

  const renderMenuItems = () =>
    MENU_ITEMS.map(({ content, name }, index) => (
      <Menu.Item
        style={{ fontSize: '16px' }}
        key={index}
        content={content}
        name={name}
        active={activeItem === name}
        onClick={(e, name) => handleMenuClick(name)}
      />
    ));

  const renderTableHeaders = () =>
    TABLE_HEADERS.map((header, index) => (
      <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
    ));

  const renderTabelRows = () =>
    orders.map(order => (
      <Table.Row key={order.id}>
        <Table.Cell>{order.userName}</Table.Cell>
        <Table.Cell>{order.userPhoneNumber}</Table.Cell>
        <Table.Cell>{order.id}</Table.Cell>
        <Table.Cell>
          {order.delivery_option ? 'التوصيل عن طريق مندوب' : 'استلام من الفرع'}
        </Table.Cell>
        <Table.Cell>
          <OrderState order={order} />
        </Table.Cell>
        <Table.Cell>
          <Link to={`/orders/${order.id}/${order.userId}`}>
            المزيد من التفاصيل
          </Link>
        </Table.Cell>
      </Table.Row>
    ));

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader size="medium">جارى البحث عن الطلبات الحالية</Loader>
      </Dimmer>
    );
  }

  if (orders.length === 0 && loading === false) {
    return (
      <Container>
        <Message
          className="text-center"
          header="عذرا"
          content="لا يوجد لديك طلبات فى الوقت الحالى"
          size="huge"
        />
      </Container>
    );
  }

  return (
    <Container>
      <Menu tabular attached>
        {renderMenuItems()}
      </Menu>

      <Table striped attached style={{ marginBottom: '50px' }}>
        <Table.Header>
          <Table.Row>{renderTableHeaders()}</Table.Row>
        </Table.Header>

        <Table.Body>{renderTabelRows()}</Table.Body>
      </Table>
    </Container>
  );
};

const mapStateToProps = ({ orders, filters, loading }) => ({
  orders: selectOrders(orders, filters),
  loading
});

const mapDispatchToProps = dispatch => ({
  getAllOrders: () => dispatch(getAllOrders()),
  getDeliveryOption: option => dispatch(getDeliveryOption(option)),
  cleanOrders: () => dispatch(cleanOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
