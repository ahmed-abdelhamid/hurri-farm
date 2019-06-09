import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  submit,
  initialize,
  SubmissionError
} from 'redux-form';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import InputField from '../../../layouts/Form/InputField';
import { editFormValidation } from '../../../../helperFunctions/formValidations';
import { editUserData, loading, notLoading } from '../../../../actions';
import formFields from './formFields';

let EditProfileForm = ({
  open,
  onClose,
  handleSubmit,
  dispatch,
  error,
  loading,
  adminData: { displayName, phoneNumber, email }
}) => {
  useEffect(() => {
    dispatch(
      initialize('editProfileForm', { displayName, phoneNumber, email })
    );
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
          <Message error content={error} />
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
          loading={loading}
          disabled={loading}
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

EditProfileForm = reduxForm({
  form: 'editProfileForm',
  async onSubmit(values, dispatch, props) {
    try {
      const id = props.adminData.userId;
      dispatch(loading());
      await dispatch(editUserData(values, id));
      dispatch(notLoading());
      props.onClose();
    } catch (e) {
      dispatch(notLoading());
      if (e.message === 'wrong-password') {
        throw new SubmissionError({
          _error: 'كلمة المرور غير صحيحة'
        });
      } else if (e.message === 'email-already-in-use') {
        throw new SubmissionError({
          _error: 'البريد الالكترونى مستخدم من قبل'
        });
      }
    }
  },
  validate: editFormValidation
})(EditProfileForm);

const mapStateToProps = ({ loading }) => ({ loading });

export default connect(mapStateToProps)(EditProfileForm);
