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
      placeholder: placeholderMessages.email
    },
    value: '',
    validation: {
      isRequired: true
    }
  },

  password: {
    inputType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: placeholderMessages.password,
      disabled: true
    },
    value: 'password',
    validation: {
      isRequired: true
    }
  }
};