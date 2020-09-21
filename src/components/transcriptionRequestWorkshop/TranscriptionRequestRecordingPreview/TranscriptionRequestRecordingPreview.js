import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { convertSecondsToTimeString } from '../../../utils/timeFormatters';
import './TranscriptionRequestRecordingPreview.css';

const TranscriptionRequestRecordingPreview = props => {
  const { startTime, endTime } = props;

  if(startTime === null || endTime === null) return null;

  return <>
    <p className="transcriptionRequestRecordingPreview__header">
      <FormattedMessage id="transcriptionRequestRecordingPreview.header"
        defaultMessage="Currently Recording Segment:" />
    </p>
    <div className="transcriptionRequestRecordingPreview">
      <p className="transcriptionRequestRecordingPreview__startTime">
        <FormattedMessage id="transcriptionRequestRecordingPreview.currentStartTimeLabel"
          defaultMessage="Start Time" />: <span className="transcriptionRequestRecordingPreview__timeValue">{convertSecondsToTimeString(startTime)}</span>
      </p>
      <p className="transcriptionRequestRecordingPreview__endTime">
        <FormattedMessage id="transcriptionRequestRecordingPreview.currentEndTimeLabel"
          defaultMessage="End Time" />: <span className="transcriptionRequestRecordingPreview__timeValue">{convertSecondsToTimeString(endTime)}</span>
      </p>
    </div>
  </>;
};

TranscriptionRequestRecordingPreview.propTypes = {
  startTime: PropTypes.number,
  endTime: PropTypes.number
};

export default TranscriptionRequestRecordingPreview;