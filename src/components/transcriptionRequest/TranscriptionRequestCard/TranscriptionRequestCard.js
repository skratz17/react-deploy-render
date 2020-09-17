import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

import './TranscriptionRequestCard.css';

const TranscriptionRequestCard = props => {
  const { transcriptionRequest, onActivate, shouldHideVideoPreview } = props;

  let transcriptionRequestActionContent;
  if(!transcriptionRequest.isActivated) {
    transcriptionRequestActionContent = <button className="btn btn--action" onClick={() => onActivate(transcriptionRequest.id)}>Activate Now</button>;
  }
  else if(!transcriptionRequest.transcriptions.length) {
    transcriptionRequestActionContent = <p>Activated - awaiting transcription.</p>;
  }
  else {
    transcriptionRequestActionContent = <Link to={`/transcriptions/${transcriptionRequest.transcriptions[0].id}`}>View Transcription</Link>;
  }

  return (
    <div className="transcriptionRequest">
      { !shouldHideVideoPreview && <div>youtube player goes here</div> }
      <div className="transcriptionRequest__timeInformationWrapper">
        <p className="transcriptionRequest__startTime">Start Time: {transcriptionRequest.startTime}</p>
        <p className="transcriptionRequest__endTime">End Time: {transcriptionRequest.endTime}</p>
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