import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

import Form from '../../../form/Form';

const TranscriptionRequestConfirm = props => {
  const { videoId, formConfig, onChange } = props;

  const [ playerVars, setPlayerVars ] = useState({
    start: props.formConfig.startTime.value,
    end: props.formConfig.endTime.value
  });

  useEffect(() => {
    const _playerVars = {
      start: props.formConfig.startTime.value,
      end: props.formConfig.endTime.value
    };
    setPlayerVars(_playerVars);
  }, [ formConfig ]);

  return (
    <div className="transcriptionRequestConfirmWrapper">
      <YouTube videoId={videoId} opts={{ playerVars }} />
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