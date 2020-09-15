export default {
  transcription: {
    inputType: 'textarea',
    elementConfig: {
      placeholder: 'Write transcription here...',
      name: 'transcription'
    },
    value: '',
    validation: {
      isRequired: true
    },
    isTouched: false,
    isValid: false
  }
};