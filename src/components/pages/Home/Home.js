import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import ProfileSettings from './ProfileSettings';

const Home = ({ auth }) => {
  return (
    <Container>
      <ProfileSettings adminData={auth} />
    </Container>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Home);
