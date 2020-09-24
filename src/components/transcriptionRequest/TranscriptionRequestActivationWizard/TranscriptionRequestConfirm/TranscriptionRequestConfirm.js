import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import YouTubePlayer from '../../../youtube/YouTubePlayer/YouTubePlayer';
import Form from '../../../form/Form';
import { FORM_ID } from './transcriptionRequestConfirmConfig';
import './TranscriptionRequestConfirm.css';

const TranscriptionRequestConfirm = props => {
  const { videoId, formConfig, onChange } = props;

  const [ playerVars, setPlayerVars ] = useState({
    start: formConfig.startTime.value,
    end: formConfig.endTime.value
  });

  useEffect(() => {
    const _playerVars = {
      start: formConfig.startTime.value,
      end: formConfig.endTime.value
    };
    setPlayerVars(_playerVars);
  }, [ formConfig ]);

  const youTubePlayerOpts = {
    height: '304',
    width: '500'
  };

  return (
    <div className="transcriptionRequestConfirm">
      <YouTubePlayer videoId={videoId} opts={{ ...youTubePlayerOpts, playerVars }} showResetButton={true} />
      <Form id={FORM_ID} formConfig={formConfig} onChange={onChange} />
    </div>
  );
};

TranscriptionRequestConfirm.propTypes = {
  videoId: PropTypes.string,
  formConfig: PropTypes.object,
  onChange: PropTypes.func
};

export default TranscriptionRequestConfirm;