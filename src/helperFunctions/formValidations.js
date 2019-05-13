import validator from 'validator';

// ADMIN FORM VALIDATION
export const editFormValidation = ({
  username,
  mobile,
  password,
  repassword
}) => {
  const errors = {};

  if (!username) {
    errors.username = 'حقل إلزامى';
  }

  if (!mobile) {
    errors.mobile = 'يرجى إدخال رقم الهاتف';
  }

  if (mobile && !validator.isMobilePhone(mobile, 'ar-SA')) {
    errors.mobile = ' رقم الجوال يجب ان يبدا بـ 05 ومكون من 10 أرقام';
  }

  if (password && password !== repassword) {
    errors.repassword = 'إعادة كلمة المرور لا تتطابق مع كلمة المرور';
  }

  return errors;
};

// PLANTS FORM VALIDATION
export const plantsFormValidation = (values, { type }) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'يرجى إدخال اسم النبات';
  }

  if (!values.sicName) {
    errors.sicName = 'يرجى إدخال الاسم العلمى للنبات';
  }

  if (!values.type) {
    errors.type = 'يرجى إدخال نوع النبات';
  }

  if (!values.desecration) {
    errors.desecration = 'يرجى إدخال وصف النبات';
  }

  if (!values.longitude) {
    errors.longitude = 'يرجى ادخال خط الطول';
  }

  if (!values.latitude) {
    errors.latitude = 'يرجى ادخال خط العرض';
  }

  if (!values.image && type === 'add') {
    errors.image = 'يرجى إرفاق صورة للنبات';
  }

  return errors;
};
