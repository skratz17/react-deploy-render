import React from 'react';
import PropTypes from 'prop-types';

const TranscriptionRequestControl = props => {
  const { isRequesting, onClick } = props;

  return (
    <div className="transcriptionRequestControlWrapper">
      <button className="transcriptionRequestControl" onClick={onClick}>
        { isRequesting ? 'Stop Transcription Request' : 'Create Transcription Request' }
      </button>
    </div>
  );
};

TranscriptionRequestControl.propTypes = {
  isRequesting: PropTypes.bool,
  onClick: PropTypes.func
};

export default TranscriptionRequestControl;