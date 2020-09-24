import { defineMessages } from 'react-intl';

export const FORM_ID = 'registrationForm';

const messages = defineMessages({
  firstName: {
    id: `${FORM_ID}.firstNamePlaceholder`,
    defaultMessage: 'First Name'
  },
  lastName: {
    id: `${FORM_ID}.lastNamePlaceholder`,
    defaultMessage: 'Last Name'
  },
  email: {
    id: `${FORM_ID}.emailPlaceholder`,
    defaultMessage: 'Email'
  },
  password: {
    id: `${FORM_ID}.passwordPlaceholder`,
    defaultMessage: 'Password'
  },
  confirmPassword: {
    id: `${FORM_ID}.confirmPasswordPlaceholder`,
    defaultMessage: 'Confirm Password'
  },
  nativeLanguageId: {
    id: `${FORM_ID}.nativeLanguageIdPlaceholder`,
    defaultMessage: 'Select your native language'
  }
});

export default {
  firstName: {
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: messages.firstName
    },
    value: '',
    validation: {
      isRequired: true
    }
  },

  lastName: {
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: messages.lastName
    },
    value: '',
    validation: {
      isRequired: true
    }
  },

  email: {
    inputType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: messages.email
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
      placeholder: messages.password,
      disabled: true
    },
    value: 'password',
    validation: {
      isRequired: true,
      mustMatch: 'confirmPassword',
      doesNotCausePairedTouch: true
    }
  },

  confirmPassword: {
    inputType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: messages.confirmPassword,
      disabled: true
    },
    value: 'password',
    validation: {
      isRequired: true,
      mustMatch: 'password'
    }
  },

  nativeLanguageId: {
    inputType: 'select',
    elementConfig: {
      placeholder: messages.nativeLanguageId
    },
    value: '',
    items: [],
    validation: {
      isRequired: true
    }
  }
};