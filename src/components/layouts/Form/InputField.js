import React from 'react';
import { Form, Message } from 'semantic-ui-react';

const InputField = ({
  input,
  required,
  name,
  placeholder,
  type,
  meta: { touched, error }
}) => {
  return (
    <Form.Field required={required}>
      <label>{placeholder}</label>
      <Form.Input
        {...input}
        name={name}
        type={type}
        placeholder={placeholder}
        required
      />
      {touched && (error && <Message error content={error} />)}
    </Form.Field>
  );
};

export default InputField;
