import React, { useEffect } from 'react';
import { Field, reduxForm, submit, initialize } from 'redux-form';
import { Modal, Form, Button } from 'semantic-ui-react';
import InputField from '../../../layouts/Form/InputField';
import { editFormValidation } from '../../../../helperFunctions/formValidations';
// import { editUserData } from '../../../../actions';
import formFields from './formFields';

const EditProfileForm = ({
  open,
  onClose,
  handleSubmit,
  dispatch,
  adminData: { username, mobile }
}) => {
  useEffect(() => {
    dispatch(initialize('editProfileForm', { username, mobile }));
  }, []);

  const renderFields = () =>
    formFields.map(({ name, type, placeholder, required }, index) => (
      <Field
        key={index}
        component={InputField}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    ));

  return (
    <Modal open={open} size="small" onClose={onClose} closeIcon={true}>
      <Modal.Header content="تعديل بيانات المستخدم" className="text-center" />
      <Modal.Content>
        <Form onSubmit={handleSubmit} error>
          {renderFields()}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          type="button"
          content="تعديل"
          icon="edit"
          labelPosition="left"
          onClick={() => {
            dispatch(submit('editProfileForm'));
          }}
        />
        <Button
          negative
          content="إلغاء"
          icon="close"
          labelPosition="left"
          onClick={onClose}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default reduxForm({
  form: 'editProfileForm',
  onSubmit(values, dispatch, props) {
    const id = localStorage.getItem('adminPlantGateId');
    // dispatch(editUserData(values, id));
    props.onClose();
  },
  validate: editFormValidation
})(EditProfileForm);
