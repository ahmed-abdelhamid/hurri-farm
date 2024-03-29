import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBar from '../layouts/NavBar/NavBar';

const PrivateRoute = ({ isSignedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isSignedIn ? (
        <div>
          <NavBar />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps)(PrivateRoute);
