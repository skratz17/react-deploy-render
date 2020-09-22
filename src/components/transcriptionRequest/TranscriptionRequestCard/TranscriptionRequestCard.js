import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import YouTubePlayer from '../../youtube/YouTubePlayer/YouTubePlayer';
import { convertSecondsToTimeString } from '../../../utils/timeFormatters';
import './TranscriptionRequestCard.css';

const TranscriptionRequestCard = props => {
  const { transcriptionRequest, onActivate, shouldHideVideoPreview } = props;

  const { videoId, startTime, endTime } = transcriptionRequest;

  const youTubePlayerOpts = {
    width: '300',
    height: '183',
    playerVars: {
      start: startTime,
      end: endTime
    }
  };

  let transcriptionRequestActionContent;
  if(!transcriptionRequest.isActivated) {
    transcriptionRequestActionContent = <>
      <button className="btn btn--delete transcriptionRequest__deleteButton">
        <i className="material-icons">delete</i>
      </button>
      <button className="btn btn--create" onClick={() => onActivate(transcriptionRequest.id)}>
        <FormattedMessage id="transcriptionRequestCard.activateButton"
          defaultMessage="Activate Now" />
      </button>
    </>;
  }
  else if(!transcriptionRequest.transcriptions.length) {
    transcriptionRequestActionContent = <p>
      <FormattedMessage id="transcriptionRequestCard.activatedText"
        defaultMessage="Activated - awaiting transcription." />
    </p>;
  }
  else {
    transcriptionRequestActionContent = <Link className="btn btn--action" to={`/transcriptions/${transcriptionRequest.transcriptions[0].id}`}>
      <FormattedMessage id="transcriptionRequestCard.viewTranscriptionLink"
        defaultMessage="View Transcription" />
    </Link>;
  }

  return (
    <div className="transcriptionRequest">
      { !shouldHideVideoPreview && 
        <YouTubePlayer videoId={videoId} opts={youTubePlayerOpts} /> 
      }
      <div className="transcriptionRequest__timeInformationWrapper">
        <p className="transcriptionRequest__startTime">
          <FormattedMessage id="transcriptionRequestCard.startTimeLabel"
            defaultMessage="Start Time:" /> {convertSecondsToTimeString(transcriptionRequest.startTime)}
        </p>
        <p className="transcriptionRequest__endTime">
          <FormattedMessage id="transcriptionRequestCard.endTimeLabel"
            defaultMessage="End Time:" /> {convertSecondsToTimeString(transcriptionRequest.endTime)}
        </p>
      </div>
      <div className="transcriptionRequest__actionWrapper">
        { transcriptionRequestActionContent }
      </div>
    </div>
  );
};

TranscriptionRequestCard.propTypes = {
  transcriptionRequest: PropTypes.object,
  shouldHideVideoPreview: PropTypes.bool,
  onActivate: PropTypes.func
};

export default TranscriptionRequestCard;