import React from 'react';
import PropTypes from 'prop-types';

const TranscriptionRequestControl = props => {
  const { isRequesting, onClick, onCancel } = props;

  return (
    <div className="transcriptionRequestControlWrapper">
      { isRequesting && 
        <button className="transcriptionRequestCancel" onClick={onCancel}>
          Cancel
        </button>
      }
      <button className="transcriptionRequestControl" onClick={onClick}>
        { isRequesting ? 'Stop Transcription Request' : 'Create Transcription Request' }
      </button>
    </div>
  );
};

TranscriptionRequestControl.propTypes = {
  isRequesting: PropTypes.bool,
  onClick: PropTypes.func,
  onCancel: PropTypes.func
};

export default TranscriptionRequestControl;