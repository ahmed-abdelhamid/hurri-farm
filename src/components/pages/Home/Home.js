import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import Card from '../../layouts/Card/Card';
import ProfileSettings from './ProfileSettings';

const Home = ({ auth }) => {
  return (
    <Container>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Card header=" عدد المستخدمين" />
          </Grid.Column>
          <Grid.Column width={12}>
            <ProfileSettings adminData={auth} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Home);
