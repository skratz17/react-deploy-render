export default {
  startTime: {
    inputType: 'input',
    label: 'Start Time',
    elementConfig: {
      type: 'text',
      name: 'startTime',
      placeholder: 'Start Time'
    },
    value: '',
    validation: {
      isRequired: true,
      mustBeLessThan: 'endTime'
    },
    isTouched: false,
    isValid: false
  },

  endTime: {
    inputType: 'input',
    label: 'End Time',
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
    isValid: false
  },

  languageId: {
    inputType: 'select',
    label: 'Language',
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
    isValid: false
  }
};