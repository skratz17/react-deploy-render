import React from 'react';
import PropTypes from 'prop-types';

import recordImage from '../../../assets/record.svg';
import stopImage from '../../../assets/stop.svg';
import './TranscriptionRequestControl.css';

const TranscriptionRequestControl = props => {
  const { isRequesting, onClick, onCancel } = props;

  return (
    <div className="transcriptionRequestControlWrapper">
      <p className="transcriptionRequestControl__prompt">{isRequesting ? 'Stop Transcription Request' : 'Start Transcription Request'}</p>
      <div className="transcriptionRequestControl__buttonsWrapper">
        <button className="transcriptionRequestControl" onClick={onClick}>
          <img className="transcriptionRequestControl__icon" src={isRequesting ? stopImage : recordImage} alt={isRequesting ? 'Stop Request' : 'Start Request'}/>
        </button>
        { isRequesting && 
          <>
            <p className="transcriptionRequestCancel__prompt">OR</p>
            <button className="btn btn--back transcriptionRequestCancel" onClick={onCancel}>
              Cancel
            </button>
          </>
        }
      </div>
    </div>
  );
};

TranscriptionRequestControl.propTypes = {
  isRequesting: PropTypes.bool,
  onClick: PropTypes.func,
  onCancel: PropTypes.func
};

export default TranscriptionRequestControl;