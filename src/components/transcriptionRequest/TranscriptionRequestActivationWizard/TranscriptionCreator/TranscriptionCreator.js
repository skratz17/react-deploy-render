import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import YouTubePlayer from '../../../youtube/YouTubePlayer/YouTubePlayer';
import Form from '../../../form/Form';
import { FORM_ID } from './transcriptionCreatorFormConfig';
import './TranscriptionCreator.css';

const TranscriptionCreator = props => {
  const { transcriptionRequest, formConfig, onChange } = props;

  if(transcriptionRequest === false) {
    return (
      <div className="transcriptionCreator">
        <FormattedMessage id="transcriptionCreator.noTranscriptionFound"
          defaultMessage="No transcription request was found for you to transcribe... you're set to go ahead and activate your transcription request!" />
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
      <YouTubePlayer videoId={transcriptionRequest.videoId} opts={youTubePlayerOpts} showResetButton={true} />
      <Form id={FORM_ID} formConfig={formConfig} onChange={onChange} />
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