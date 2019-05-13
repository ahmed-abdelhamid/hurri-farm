import React, { useState } from 'react';
import { Button, Message } from 'semantic-ui-react';

const FileField = ({ input, name, meta: { touched, error } }) => {
  const [fileName, setFileName] = useState('');
  const imageInputRef = React.createRef();

  const onInputChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileName(file.name);
    input.onChange(file);
  };
  return (
    <React.Fragment>
      <Button
        type="button"
        content="إضافة صورة"
        labelPosition="left"
        icon="file image"
        onClick={() => imageInputRef.current.click()}
      />
      <input
        type="file"
        onChange={onInputChange}
        ref={imageInputRef}
        hidden
        name={name}
      />
      {touched && error && <Message error content={error} />}
      {fileName && <Message content={fileName} positive />}
    </React.Fragment>
  );
};

export default FileField;
