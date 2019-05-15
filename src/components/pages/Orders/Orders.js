import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Table, Message, Button } from 'semantic-ui-react';
import { getAllOrders } from '../../../actions';

const Orders = ({ getAllOrders, orders }) => {
  useEffect(() => {
    const fetchData = () => getAllOrders();
    fetchData();
  }, []);

  const tableHeaders = [
    'اسم المستخدم',
    'رقم الجوال',
    'رقم الطلب',
    'طريقة التوصيل',
    'حالة الطلب',
    'تفاصيل الطلب'
  ];

  const renderTableHeaders = () =>
    tableHeaders.map((header, index) => (
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
        <Table.Cell>{order.order_status}</Table.Cell>
        <Table.Cell>
          <Link to={`/orders/${order.id}`}>المزيد من التفاصيل</Link>
        </Table.Cell>
      </Table.Row>
    ));

  if (!orders) {
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
      <Table striped>
        <Table.Header>
          <Table.Row>{renderTableHeaders()}</Table.Row>
        </Table.Header>

        <Table.Body>{renderTabelRows()}</Table.Body>
      </Table>
    </Container>
  );
};

const mapStateToProps = ({ orders }) => ({ orders });

const mapDispatchToProps = dispatch => ({
  getAllOrders: () => dispatch(getAllOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
