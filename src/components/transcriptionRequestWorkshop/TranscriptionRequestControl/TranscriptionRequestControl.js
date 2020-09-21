import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import recordImage from '../../../assets/record.svg';
import stopImage from '../../../assets/stop.svg';
import './TranscriptionRequestControl.css';

defineMessages({
  startRequestAltText: {
    id: 'transcriptionRequestControl.startRequestAltText',
    defaultMessage: 'Start Request'
  },
  stopRequestAltText: {
    id: 'transcriptionRequestControl.stopRequestAltText',
    defaultMessage: 'Stop Request'
  }
});

const TranscriptionRequestControl = props => {
  const { isRequesting, disabled, onClick, onCancel } = props;

  return (
    <div className="transcriptionRequestControlWrapper">
      <p className="transcriptionRequestControl__prompt">
        {isRequesting ? 
          <FormattedMessage id="transcriptionRequestControl.stopTranscriptionRequestPrompt"
            defaultMessage="Stop Transcription Request" /> : 
          <FormattedMessage id="transcriptionRequestControl.startTranscriptionRequestPrompt"
            defaultMessage="Start Transcription Request" />
        }
      </p>
      <div className="transcriptionRequestControl__buttonsWrapper">
        <button className="transcriptionRequestControl" disabled={disabled} onClick={onClick}>
          <img className={`transcriptionRequestControl__icon ${!disabled && !isRequesting ? 'red' : ''}`} 
            src={isRequesting ? stopImage : recordImage} 
            alt={isRequesting ? 
              props.intl.formatMessage({ id: 'transcriptionRequestControl.stopRequestAltText' }) : 
              props.intl.formatMessage({ id: 'transcriptionRequestControl.startRequestAltText' })
            }
          />
        </button>
        { isRequesting && 
          <>
            <p className="transcriptionRequestCancel__prompt">
              <FormattedMessage id="transcriptionRequestControl.orText"
                defaultMessage="OR" />
            </p>
            <button className="btn btn--back transcriptionRequestCancel" onClick={onCancel}>
              <FormattedMessage id="transcriptionRequestControl.cancelTranscriptionRequestButton"
                defaultMessage="Cancel" />
            </button>
          </>
        }
      </div>
    </div>
  );
};

TranscriptionRequestControl.propTypes = {
  isRequesting: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onCancel: PropTypes.func
};

export default injectIntl(TranscriptionRequestControl);