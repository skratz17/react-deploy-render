import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';

import './TranscriptionRequestDashboardData.css';

const TranscriptionRequestDashboardData = props => {
  const { transcriptionRequests, transcriptions } = props;

  const calculateFullTimeDurationOfRequestsInSeconds = requests => {
    return requests.reduce((sum, tR) => {
      return sum + (tR.endTime - tR.startTime);
    }, 0);
  };

  const timeDurationOfTranscriptionsForMyRequests = calculateFullTimeDurationOfRequestsInSeconds(
    transcriptionRequests.filter(tR => tR.transcriptions && tR.transcriptions.length)
  );

  const timeDurationOfMyTranscriptions = calculateFullTimeDurationOfRequestsInSeconds(
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
        defaultMessage="Minutes of Transcribed Content Your Requests Have Generated" />,
      value: <FormattedNumber value={timeDurationOfTranscriptionsForMyRequests / 60} 
        maximumFractionDigits={2} />
    },
    {
      description: <FormattedMessage id="transcriptionRequestDashboardData.minutesTranscribed"
        defaultMessage="Minutes of Content You Have Transcribed" />,
      value: <FormattedNumber value={timeDurationOfMyTranscriptions / 60} 
        maximumFractionDigits={2} />
    }
  ];

  return <>
    <h2 className="transcriptionRequestDashboardData__header">
      <FormattedMessage id="transcriptionRequestDashboardData.header"
        defaultMessage="My Activity"/>
    </h2>
    <div className="transcriptionRequestDashboardData">
      {
        dataPoints.map(({ description, value }, index) => <React.Fragment key={index}>
          <div className="dataPoint">
            <p className="dataPoint__value">{value}</p>
            <p className="dataPoint__description">{description}</p>
          </div>
          { index !== dataPoints.length - 1 && 
            <div className="line line--50 line--y"></div>
          }
        </React.Fragment>)
      }
    </div>
  </>;
};

TranscriptionRequestDashboardData.propTypes = {
  transcriptionRequests: PropTypes.array,
  transcriptions: PropTypes.array
};

export default injectIntl(TranscriptionRequestDashboardData);