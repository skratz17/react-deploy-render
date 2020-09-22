import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';

import { convertSecondsToTimeString } from '../../../utils/timeFormatters';

const TranscriptionRequestDashboardData = props => {
  const { transcriptionRequests, transcriptions } = props;

  const calculateFullTimeDurationOfRequests = requests => {
    return requests.reduce((sum, tR) => {
      return sum + (tR.endTime - tR.startTime);
    }, 0);
  };

  const timeDurationOfTranscriptionsForMyRequests = calculateFullTimeDurationOfRequests(
    transcriptionRequests.filter(tR => tR.transcriptions && tR.transcriptions.length)
  );

  const timeDurationOfMyTranscriptions = calculateFullTimeDurationOfRequests(
    transcriptions.map(t => t.transcriptionRequest)
  );

  const dataPoints = [
    {
      description: <FormattedMessage id="transcriptionRequestDashboardData.transcriptionRequestsMade"
        defaultMessage="Transcription Requests Made" />,
      value: <FormattedNumber value={transcriptionRequests.length} />
    },
    {
      description: <FormattedMessage id="transcriptionRequestDashboardData.transcriptionsMade"
        defaultMessage="Transcriptions Completed" />,
      value: <FormattedNumber value={transcriptions.length} />
    },
    {
      description: <FormattedMessage id="transcriptionRequestDashboardData.minutesOfTranscriptionsGenerated"
        defaultMessage="Minutes of Transcripted Content Your Requests Have Generated" />,
      value: convertSecondsToTimeString(timeDurationOfTranscriptionsForMyRequests)
    },
    {
      description: <FormattedMessage id="transcriptionRequestDashboardData.minutesTranscribed"
        defaultMessage="Minutes of Content You Have Transcribed" />,
      value: convertSecondsToTimeString(timeDurationOfMyTranscriptions)
    }
  ];

  return <>
    <h2 className="transcriptionRequestDashboardData__header">
      <FormattedMessage id="transcriptionRequestDashboardData.header"
        defaultMessage="My Activity"/>
    </h2>
    <div className="transcriptionRequestDashboardData">
      {
        dataPoints.map(({ description, value }) => (
          <div className="dataPoint">
            <p className="dataPoint__value">{value}</p>
            <p className="dataPoint__description">{description}</p>
          </div>
        ))
      }
    </div>
  </>;
};

TranscriptionRequestDashboardData.propTypes = {
  transcriptionRequests: PropTypes.array,
  transcriptions: PropTypes.array
};

export default injectIntl(TranscriptionRequestDashboardData);