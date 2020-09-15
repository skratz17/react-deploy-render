import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TranscriptionRequestActivationWizard = props => {
  const { transcriptionRequestId, isShowing } = props;
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