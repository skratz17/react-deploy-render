import React from 'react';
import PropTypes from 'prop-types';

import recordImage from '../../../assets/record.svg';
import stopImage from '../../../assets/stop.svg';

const TranscriptionRequestControl = props => {
  const { isRequesting, onClick, onCancel } = props;

  return (
    <div className="transcriptionRequestControlWrapper">
      <p>{isRequesting ? 'Stop Transcription Request' : 'Create Transcription Request'}</p>
      <button className="transcriptionRequestControl" onClick={onClick}>
        <img src={isRequesting ? stopImage : recordImage} alt={isRequesting ? 'Stop Request' : 'Create Request'}/>
      </button>
      { isRequesting && 
        <button className="transcriptionRequestCancel" onClick={onCancel}>
          Cancel
        </button>
      }
    </div>
  );
};

TranscriptionRequestControl.propTypes = {
  isRequesting: PropTypes.bool,
  onClick: PropTypes.func,
  onCancel: PropTypes.func
};

export default TranscriptionRequestControl;