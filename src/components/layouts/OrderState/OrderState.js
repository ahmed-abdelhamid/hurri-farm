import React from 'react';
import { connect } from 'react-redux';
import { Progress, Button } from 'semantic-ui-react';
import { updateOrderState } from '../../../actions';

const OrderState = ({ order, role, updateOrderState }) => {
  let percent,
    content,
    authenticated = false;
  switch (order.order_status) {
    case 'قيد المراجعة':
      percent = 0;
      content = 'تنفيذ الطلب';
      authenticated = role === 'farm' || role === 'admin';
      break;
    case 'قيد التنفيذ':
      percent = 25;
      content = 'تجهيز الطلب';
      authenticated = role === 'masla' || role === 'admin';
      break;
    case 'جارى التجهيز':
      percent = 50;
      content = 'تم التجهيز';
      authenticated = role === 'shop' || role === 'admin';
      break;
    case 'جاهز للاستلام':
      percent = 75;
      content = 'تم تسليم الطلب';
      authenticated = role === 'shop' || role === 'admin';
      break;
    case 'جارى التوصيل':
      percent = 75;
      content = 'تم توصيل الطلب';
      authenticated = role === 'delivery' || role === 'admin';
      break;
    case 'تم التوصيل':
    case 'تم الاستلام':
      percent = 100;
      authenticated = true;
      break;
    default:
      percent = 0;
  }

  return (
    <React.Fragment>
      <Progress
        disabled={!authenticated}
        percent={percent}
        indicating
        label={order.order_status}
        size="tiny"
      />
      {content && (
        <Button
          disabled={!authenticated}
          content={content}
          fluid
          onClick={() => updateOrderState(order)}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth }) => ({ role: auth.role });

const mapDispatchToProps = dispatch => ({
  updateOrderState: order => dispatch(updateOrderState(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderState);
