import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Button } from 'semantic-ui-react';
import Card from '../../layouts/Card/Card';
import ProfileSettings from './ProfileSettings';

const Home = ({ usersCount, plantsCount, auth, counts }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth, counts }) => ({ auth, counts });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
