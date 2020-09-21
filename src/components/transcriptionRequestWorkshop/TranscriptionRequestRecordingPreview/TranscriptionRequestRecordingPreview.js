import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { convertSecondsToTimeString } from '../../../utils/timeFormatters';

const TranscriptionRequestRecordingPreview = props => {
  const { startTime, endTime } = props;

  if(startTime === null || endTime === null) return null;

  return (
    <div className="transcriptionRequestRecordingPreview">
      <p>
        <FormattedMessage id="transcriptionRequestWorkshop.currentStartTimeLabel"
          defaultMessage="Start Time" /> {convertSecondsToTimeString(startTime)}
      </p>
      <p>
        <FormattedMessage id="transcriptionRequestWorkshop.currentEndTimeLabel"
          defaultMessage="End Time" /> {convertSecondsToTimeString(endTime)}
      </p>
    </div>
  )
};

TranscriptionRequestRecordingPreview.propTypes = {
  startTime: PropTypes.number,
  endTime: PropTypes.number
};

export default TranscriptionRequestRecordingPreview;