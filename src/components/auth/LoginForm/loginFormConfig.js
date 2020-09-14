export default {
  email: {
    inputType: 'input',
    elementConfig: {
      type: 'text',
      name: 'email',
      placeholder: 'Email'
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  },

  password: {
    inputType: 'input',
    elementConfig: {
      type: 'password',
      name: 'password',
      placeholder: 'Password'
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  }
};