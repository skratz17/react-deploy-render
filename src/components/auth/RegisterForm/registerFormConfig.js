export default {
  firstName: {
    inputType: 'input',
    elementConfig: {
      name: 'firstName',
      type: 'text',
      placeholder: 'First Name'
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  },

  lastName: {
    inputType: 'input',
    elementConfig: {
      name: 'lastName',
      type: 'text',
      placeholder: 'Last Name'
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  },

  email: {
    inputType: 'input',
    elementConfig: {
      name: 'email',
      type: 'text',
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
      name: 'password',
      type: 'password',
      placeholder: 'Password'
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  },

  confirmPassword: {
    inputType: 'input',
    elementConfig: {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password'
    },
    value: '',
    validation: {
      isRequired: true,
      mustMatch: 'password'
    },
    isTouched: false,
    isValid: false
  },

  nativeLanguageId: {
    inputType: 'select',
    elementConfig: {
      name: 'nativeLanguageId',
      placeholder: 'Select your native language'
    },
    value: '',
    items: [],
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  }
};