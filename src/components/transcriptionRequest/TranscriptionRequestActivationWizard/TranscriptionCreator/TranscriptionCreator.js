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

  const youTubePlayerOpts = {
    height: '304',
    width: '500', 
    playerVars: {
      start: transcriptionRequest.startTime,
      end: transcriptionRequest.endTime
    }
  };

  return (
    <div className="transcriptionCreator">
      <div style={{ height: youTubePlayerOpts.height + 'px', width: youTubePlayerOpts.width + 'px' }}>
        <YouTube videoId={transcriptionRequest.videoId} opts={youTubePlayerOpts} />
      </div>
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