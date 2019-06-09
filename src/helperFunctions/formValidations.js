import validator from 'validator';

// ADMIN FORM VALIDATION
export const editFormValidation = ({
  displayName,
  phoneNumber,
  email,
  oldPassword,
  newPassword,
  repassword
}) => {
  const errors = {};

  if (!displayName) {
    errors.displayName = 'يرجى إدخال اسم المستخدم';
  }

  if (!phoneNumber) {
    errors.phoneNumber = 'يرجى إدخال رقم الهاتف';
  }

  if (phoneNumber && !validator.isMobilePhone(phoneNumber, 'ar-SA')) {
    errors.phoneNumber = ' رقم الجوال يجب ان يبدا بـ 05 ومكون من 10 أرقام';
  }

  if (!email) {
    errors.email = 'يرجى إدخال البريد الإلكترونى';
  }

  if (email && !validator.isEmail(email)) {
    errors.email = 'بريدك الإلكترونى غير صحيح';
  }

  if (!oldPassword) {
    errors.oldPassword = 'لتعديل البيانات يجب إدخال كلمة المرور الحالية';
  }

  if (newPassword && newPassword !== repassword) {
    errors.repassword = 'إعادة كلمة المرور لا تتطابق مع كلمة المرور';
  }

  return errors;
};
