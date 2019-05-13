import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isSignedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isSignedIn ? (
        <Redirect to="/home" />
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    }
  />
);

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps)(PublicRoute);
