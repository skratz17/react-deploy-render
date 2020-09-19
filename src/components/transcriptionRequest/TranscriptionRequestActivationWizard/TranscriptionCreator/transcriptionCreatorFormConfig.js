import { defineMessages } from 'react-intl';

export const FORM_ID = 'transcriptionCreatorForm';

const messages = defineMessages({
  transcription: {
    id: `${FORM_ID}.transcriptionPlaceholder`,
    defaultMessage: 'Write transcription here...'
  }
});

export default {
  transcription: {
    inputType: 'textarea',
    elementConfig: {
      placeholder: messages.transcription
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  }
};