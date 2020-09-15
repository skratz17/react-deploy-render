import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TranscriptionRequestActivationWizard = props => {
  const { transcriptionRequestId, isShowing } = props;

  const [ currentStep, setCurrentStep ] = useState(0);

  if(transcriptionRequestId === null) {
    return null;
  }

  return (
    <div className="transcriptionRequestActivationWizardWrapper">
      the wizard ishere
    </div>
  );
};

TranscriptionRequestActivationWizard.propTypes = {
  transcriptionRequestId: PropTypes.number,
  isShowing: PropTypes.bool
};

export default TranscriptionRequestActivationWizard;