import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBar from '../layouts/NavBar/NavBar';

const PrivateRoute = ({ isSignedIn, role, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isSignedIn && role === 'admin' ? (
        <div>
          <NavBar />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/home" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  role: state.auth.role
});

export default connect(mapStateToProps)(PrivateRoute);
