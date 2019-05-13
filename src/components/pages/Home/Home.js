import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Button } from 'semantic-ui-react';
import Card from '../../layouts/Card/Card';
import ProfileSettings from './ProfileSettings';

const Home = ({ usersCount, plantsCount, auth, counts }) => {
  useEffect(() => {
    const fetchData = () => {
      usersCount();
      plantsCount();
      plantsCount(true);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={4}>
              <Card header=" عدد المستخدمين" count={counts.usersCount} />
            </Grid.Column>
            <Grid.Column width={12}>
              <ProfileSettings adminData={auth} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered columns={3}>
            <Grid.Column>
              <Card
                header="النباتات المدرسة"
                count={counts.discoveredPlantsCount}
              >
                <Button as={Link} to="/plants/confirmed" primary>
                  عرض
                </Button>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card
                header="النباتات الغير المدرسة"
                count={counts.undiscoveredPlantsCount}
              >
                <Button as={Link} to="/plants/unconfirmed" primary>
                  عرض
                </Button>
              </Card>
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
