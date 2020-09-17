import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

import Form from '../../../form/Form';
import './TranscriptionCreator.css';

const TranscriptionCreator = props => {
  const { transcriptionRequest, formConfig, onChange } = props;

  if(transcriptionRequest === false) {
    return (
      <div className="transcriptionCreator">
        No transcription request was found for you to transcribe... you're set to go ahead and activate your transcription request!
      </div>
    );
  }

  const playerVars = {
    start: transcriptionRequest.startTime,
    end: transcriptionRequest.endTime
  };

  return (
    <div className="transcriptionCreator">
      <YouTube videoId={transcriptionRequest.videoId} opts={{ playerVars }} />
      <Form formConfig={formConfig} onChange={onChange} />
    </div>
  );
};

TranscriptionCreator.propTypes = {
  transcriptionRequest: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  formConfig: PropTypes.object,
  onChange: PropTypes.func
};

export default TranscriptionCreator;