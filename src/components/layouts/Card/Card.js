import React from 'react';
import { Card } from 'semantic-ui-react';

const CustomCard = ({ count, header, meta, children }) => {
  return (
    <Card style={{ display: 'inline-block', width: '100%' }}>
      <Card.Content>
        <Card.Header
          textAlign="center"
          style={{ fontSize: '30px', height: '100px' }}
        >
          {header}
        </Card.Header>
        <Card.Meta textAlign="center" style={{ fontSize: '25px' }}>
          {meta}
        </Card.Meta>
        <Card.Description textAlign="center" style={{ fontSize: '70px' }}>
          {count || 0}
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="center">
        {children}
      </Card.Content>
    </Card>
  );
};

export default CustomCard;
