export default [
  {
    name: 'displayName',
    type: 'text',
    placeholder: 'اسم المستخدم',
    required: true
  },
  {
    name: 'phoneNumber',
    type: 'text',
    placeholder: 'رقم الجوال',
    required: true
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'البريد الإلكترونى',
    required: true
  },
  {
    name: 'oldPassword',
    type: 'password',
    placeholder: 'كلمة المرور',
    required: true
  },
  {
    name: 'newPassword',
    type: 'password',
    placeholder: 'كلمة المرور الجديدة',
    required: false
  },
  {
    name: 'repassword',
    type: 'password',
    placeholder: 'اعادة كلمة المرور الجديدة',
    required: false
  }
];
