export default {
  startTime: {
    inputType: 'input',
    elementConfig: {
      type: 'text',
      name: 'startTime',
      placeholder: 'Start Time'
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: true
  },

  endTime: {
    inputType: 'input',
    elementConfig: {
      type: 'text',
      name: 'endTime',
      placeholder: 'End Time'
    },
    value: '',
    validation: {
      isRequired: true,
      mustBeGreaterThan: 'startTime'
    },
    isTouched: false,
    isValid: true
  },

  languageId: {
    inputType: 'select',
    elementConfig: {
      name: 'languageId',
      placeholder: 'What Language Is This Segment In?'
    },
    value: '',
    items: [],
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: true
  }
};