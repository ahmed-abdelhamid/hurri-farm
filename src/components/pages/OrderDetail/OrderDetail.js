import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Message, Divider, Header } from 'semantic-ui-react';
import { getOrderById } from '../../../actions';
import DetailsTable from './DetailsTable';
import {
  branchDetailsKeys,
  deliveryDetailsKeys,
  orderDetailsKeys,
  orderedProducts
} from './fixtures';

const OrderDetail = ({ getOrderById, orderDetail, match }) => {
  useEffect(() => {
    const { orderId, userId } = match.params;
    const fetchOrder = () => getOrderById(orderId, userId);
    fetchOrder();
  }, []);

  if (!orderDetail) {
    return (
      <Container>
        <Message
          negative
          className="text-center"
          header="عذرا"
          content="لا يوجد طلب بهذا الرقم"
          size="huge"
        />
      </Container>
    );
  }

  return (
    <Container>
      <DetailsTable
        title="تفاصيل الفرع"
        keys={branchDetailsKeys}
        details={orderDetail.branch_details}
      />

      <Divider horizontal section />
      <DetailsTable
        title="تفاصيل الطلب"
        keys={orderDetailsKeys}
        details={orderDetail}
      />
      <Divider horizontal section />
      <Header as="h2" content="المنتجات المطلوبة" />
      {orderDetail.products.map((product, index) => (
        <DetailsTable key={index} keys={orderedProducts} details={product} />
      ))}
      <Divider horizontal section />
    </Container>
  );
};

const mapStateToProps = ({ orders }) => ({ orderDetail: orders[0] });

const mapDispatchToProps = dispatch => ({
  getOrderById: (orderId, userId) => dispatch(getOrderById(orderId, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetail);
