import React from 'react';
import { Header, Table } from 'semantic-ui-react';

const DetailsTable = ({ title, keys, details }) => {
  return (
    <div>
      {title && <Header as="h2" content={title} />}
      <Table definition>
        <Table.Body>
          {keys.map((key, index) => (
            <Table.Row key={index}>
              <Table.Cell collapsing>{key.translate}</Table.Cell>
              {key.name === 'location' ? (
                <Table.Cell>{`${details[key.name].x}, ${
                  details[key.name].x
                }`}</Table.Cell>
              ) : (
                <Table.Cell>{details[key.name]}</Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DetailsTable;
