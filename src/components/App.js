import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AdminRoute from './routes/AdminRoute';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import OrderDetail from './pages/OrderDetail/OrderDetail';
import Clients from './pages/Clients/Clients';
import Products from './pages/Products/Products';

export const history = createBrowserHistory();

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div dir="rtl">
          <PublicRoute path="/" component={LoginPage} exact />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/orders" component={Orders} exact />
          <PrivateRoute
            path="/orders/:orderId/:userId"
            component={OrderDetail}
          />
          <AdminRoute path="/clients" component={Clients} />
          <AdminRoute path="/products" component={Products} />
        </div>
      </Router>
    );
  }
}

export default App;
