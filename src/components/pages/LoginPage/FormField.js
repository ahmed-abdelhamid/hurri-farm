import React from 'react';
import { Form } from 'semantic-ui-react';

const FormField = ({ input, fluid, icon, iconPosition, placeholder, type }) => (
  <Form.Input
    {...input}
    fluid={fluid}
    icon={icon}
    placeholder={placeholder}
    type={type}
    iconPosition={iconPosition}
  />
);

export default FormField;
