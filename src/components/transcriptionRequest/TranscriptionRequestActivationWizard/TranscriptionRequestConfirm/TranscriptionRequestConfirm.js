import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

import Form from '../../../form/Form';
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

  return (
    <div className="transcriptionRequestConfirm">
      <YouTube videoId={videoId} opts={{ height: '304', width: '500', playerVars }} />
      <Form formConfig={formConfig} onChange={onChange} />
    </div>
  );
};

TranscriptionRequestConfirm.propTypes = {
  videoId: PropTypes.string,
  formConfig: PropTypes.object,
  onChange: PropTypes.func
};

export default TranscriptionRequestConfirm;