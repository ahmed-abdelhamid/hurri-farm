import React from 'react';
import { connect } from 'react-redux';
import { Progress, Button } from 'semantic-ui-react';
import { updateOrderState } from '../../../actions';

const OrderState = ({ order, updateOrderState }) => {
  let percent;
  let content;
  switch (order.order_status) {
    case 'قيد المراجعة':
      percent = 0;
      content = 'تنفيذ الطلب';
      break;
    case 'قيد التنفيذ':
      percent = 25;
      content = 'تجهيز الطلب';
      break;
    case 'جارى التجهيز':
      percent = 50;
      content = 'تم التجهيز';
      break;
    case 'جاهز للاستلام':
      percent = 75;
      content = 'تم تسليم الطلب';
      break;
    case 'جارى التوصيل':
      percent = 75;
      content = 'تم توصيل الطلب';
      break;
    case 'تم التوصيل':
    case 'تم الاستلام':
      percent = 100;
      break;
    default:
      percent = 0;
  }

  return (
    <React.Fragment>
      <Progress
        percent={percent}
        indicating
        label={order.order_status}
        size="tiny"
      />
      {content && (
        <Button
          content={content}
          fluid
          onClick={() => updateOrderState(order)}
        />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  updateOrderState: order => dispatch(updateOrderState(order))
});

export default connect(
  undefined,
  mapDispatchToProps
)(OrderState);
