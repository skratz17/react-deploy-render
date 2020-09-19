import { defineMessages } from 'react-intl';

export const FORM_ID = 'transcriptionRequestConfirmForm';

const messages = defineMessages({
  startTimePlaceholder: {
    id: `${FORM_ID}.startTimePlaceholder`,
    defaultMessage: 'Start Time'
  },
  startTimeLabel: {
    id: `${FORM_ID}.startTimeLabel`,
    defaultMessage: 'Start Time'
  },
  endTimePlaceholder: {
    id: `${FORM_ID}.endTimePlaceholder`,
    defaultMessage: 'End Time'
  },
  endTimeLabel: {
    id: `${FORM_ID}.endTimeLabel`,
    defaultMessage: 'End Time'
  },
  languageIdPlaceholder: {
    id: `${FORM_ID}.languageIdPlaceholder`,
    defaultMessage: 'What Language Is This Segment In?'
  },
  languageIdLabel: {
    id: `${FORM_ID}.languageIdLabel`,
    defaultMessage: 'Language'
  }
});

export default {
  startTime: {
    inputType: 'time',
    label: messages.startTimeLabel,
    elementConfig: {
      type: 'text',
      placeholder: messages.startTimePlaceholder
    },
    value: '',
    validation: {
      isRequired: true,
      mustBeNumeric: true,
      mustBeLessThan: 'endTime'
    },
    isTouched: false,
    isValid: false
  },

  endTime: {
    inputType: 'time',
    label: messages.endTimeLabel,
    elementConfig: {
      type: 'text',
      placeholder: messages.endTimePlaceholder
    },
    value: '',
    validation: {
      isRequired: true,
      mustBeNumeric: true,
      mustBeGreaterThan: 'startTime'
    },
    isTouched: false,
    isValid: false
  },

  languageId: {
    inputType: 'select',
    label: messages.languageIdLabel,
    elementConfig: {
      placeholder: messages.languageIdPlaceholder
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