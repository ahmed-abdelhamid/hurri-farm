import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Table, Message, Dimmer, Loader } from 'semantic-ui-react';
import { getAllClients, clearClients } from '../../../actions';
import { TABLE_HEADERS } from './fixtures';

const Orders = ({ clients, getAllClients, clearClients }) => {
  useEffect(() => {
    getAllClients();

    return () => clearClients();
  }, []);

  const renderTableHeaders = () =>
    TABLE_HEADERS.map((header, index) => (
      <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
    ));

  const renderTabelRows = () =>
    clients.map(client => (
      <Table.Row key={client.id}>
        <Table.Cell>{client.name}</Table.Cell>
        <Table.Cell>{client.phoneNumber}</Table.Cell>
        <Table.Cell />
      </Table.Row>
    ));

  if (!clients) {
    return (
      <Dimmer active inverted>
        <Loader size="medium">جارى البحث عن العملاء الحاليين</Loader>
      </Dimmer>
    );
  }

  if (clients.length === 0) {
    return (
      <Container>
        <Message
          className="text-center"
          header="عذرا"
          content="لا يوجد لديك عملاء"
          size="huge"
        />
      </Container>
    );
  }

  return (
    <Container>
      <Table striped attached style={{ margin: '50px 0' }}>
        <Table.Header>
          <Table.Row>{renderTableHeaders()}</Table.Row>
        </Table.Header>

        <Table.Body>{renderTabelRows()}</Table.Body>
      </Table>
    </Container>
  );
};

const mapStateToProps = ({ clients }) => ({ clients });

const mapDispatchToProps = dispatch => ({
  getAllClients: () => dispatch(getAllClients()),
  clearClients: () => dispatch(clearClients())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
