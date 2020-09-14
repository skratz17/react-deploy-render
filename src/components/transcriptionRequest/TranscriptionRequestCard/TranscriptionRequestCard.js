import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

const TranscriptionRequestCard = props => {
  const { transcriptionRequest, onActivate, shouldHideVideoPreview } = props;

  let transcriptionRequestActionContent;
  if(!transcriptionRequest.isActive) {
    transcriptionRequestActionContent = <button onClick={() => onActivate(transcriptionRequest.id)}>Activate Now</button>;
  }
  else if(!transcriptionRequest.transcription) {
    transcriptionRequestActionContent = <p>Activated - awaiting transcription.</p>;
  }
  else {
    transcriptionRequestActionContent = <Link to={`/transcriptions/${transcriptionRequest.transcription.id}`}>View Transcription</Link>;
  }

  return (
    <div className="transcriptionRequest">
      { !shouldHideVideoPreview && <div>youtube player goes here</div> }
      <div className="transcriptionRequest__TimeInformationWrapper">
        <p className="transcriptionRequest__startTime">Start: {transcriptionRequest.startTime}</p>
        <p className="transcriptionRequest__endTime">End: {transcriptionRequest.endTime}</p>
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