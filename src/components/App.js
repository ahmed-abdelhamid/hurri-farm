import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import Home from './pages/Home/Home';

export const history = createBrowserHistory();

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div dir="rtl">
          <PublicRoute path="/" component={LoginPage} exact />
          <PrivateRoute path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
