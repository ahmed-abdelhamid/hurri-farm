export default [
  {
    name: 'username',
    type: 'text',
    placeholder: 'اسم المستخدم',
    required: true
  },
  { name: 'mobile', type: 'text', placeholder: 'رقم الجوال', required: true },
  {
    name: 'password',
    type: 'password',
    placeholder: 'كلمة المرور',
    required: false
  },
  {
    name: 'repassword',
    type: 'password',
    placeholder: 'اعادة كلمة المرور',
    required: false
  }
];