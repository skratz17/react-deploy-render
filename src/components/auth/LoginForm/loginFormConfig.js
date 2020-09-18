import { defineMessages } from 'react-intl';

export const placeholderMessages = defineMessages({
  email: {
    id: 'loginForm.emailPlaceholder',
    defaultMessage: 'Email'
  },
  password: {
    id: 'loginForm.passwordPlaceholder',
    defaultMessage: 'Password'
  }
});

export default {
  email: {
    inputType: 'input',
    elementConfig: {
      type: 'text',
      name: 'email',
      placeholder: placeholderMessages.email
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
      placeholder: placeholderMessages.password
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  }
};