import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Message,
  Divider,
  Header,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { getOrderById, removeOrderDetail } from '../../../actions';
import DetailsTable from './DetailsTable';
import {
  branchDetailsKeys,
  deliveryDetailsKeys,
  orderDetailsKeys,
  orderedProducts
} from './fixtures';

const OrderDetail = ({
  getOrderById,
  orderDetail,
  removeOrderDetail,
  match
}) => {
  useEffect(() => {
    const { orderId, userId } = match.params;
    getOrderById(orderId, userId);

    return () => removeOrderDetail();
  }, []);

  if (!orderDetail) {
    return (
      <Dimmer active inverted>
        <Loader size="medium">جارى تحضير تفاصيل الطلب</Loader>
      </Dimmer>
    );
  }

  if (!orderDetail.products) {
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

  const renderDeliveryOptionTable = orderDetail.delivery_option ? (
    <DetailsTable
      title="تفاصيل التوصيل"
      keys={deliveryDetailsKeys}
      details={orderDetail.delivery_details}
    />
  ) : (
    <DetailsTable
      title="تفاصيل الفرع"
      keys={branchDetailsKeys}
      details={orderDetail.branch_details}
    />
  );

  return (
    <Container>
      {renderDeliveryOptionTable}

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

const mapStateToProps = ({ orderDetail }) => ({ orderDetail });

const mapDispatchToProps = dispatch => ({
  getOrderById: (orderId, userId) => dispatch(getOrderById(orderId, userId)),
  removeOrderDetail: () => dispatch(removeOrderDetail())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetail);
