import { defineMessages } from 'react-intl';

export const FORM_ID = 'loginForm';

const placeholderMessages = defineMessages({
  email: {
    id: `${FORM_ID}.emailPlaceholder`,
    defaultMessage: 'Email'
  },
  password: {
    id: `${FORM_ID}.passwordPlaceholder`,
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