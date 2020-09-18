import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

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
    transcriptionRequestActionContent = <button className="btn btn--create" onClick={() => onActivate(transcriptionRequest.id)}>Activate Now</button>;
  }
  else if(!transcriptionRequest.transcriptions.length) {
    transcriptionRequestActionContent = <p>Activated - awaiting transcription.</p>;
  }
  else {
    transcriptionRequestActionContent = <Link className="btn btn--action" to={`/transcriptions/${transcriptionRequest.transcriptions[0].id}`}>View Transcription</Link>;
  }

  return (
    <div className="transcriptionRequest">
      { !shouldHideVideoPreview && 
        <div style={{ height: youTubePlayerOpts.height + 'px', width: youTubePlayerOpts.width + 'px' }}>
          <YouTube videoId={videoId} opts={youTubePlayerOpts} /> 
        </div>
      }
      <div className="transcriptionRequest__timeInformationWrapper">
        <p className="transcriptionRequest__startTime">Start Time: {convertSecondsToTimeString(transcriptionRequest.startTime)}</p>
        <p className="transcriptionRequest__endTime">End Time: {convertSecondsToTimeString(transcriptionRequest.endTime)}</p>
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