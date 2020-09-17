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

  const youTubePlayerOpts = {
    height: '304',
    width: '500'
  };

  return (
    <div className="transcriptionRequestConfirm">
      <div style={{ height: youTubePlayerOpts.height + 'px', width: youTubePlayerOpts.width + 'px' }}>
        <YouTube videoId={videoId} opts={{ ...youTubePlayerOpts, playerVars }} />
      </div>
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