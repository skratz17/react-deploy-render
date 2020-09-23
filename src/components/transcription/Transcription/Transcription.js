import React, { useState, useEffect, useContext } from 'react';
import { FormattedMessage } from 'react-intl';

import YouTubePlayer from '../../youtube/YouTubePlayer/YouTubePlayer';
import { TranscriptionContext } from '../TranscriptionProvider';
import './Transcription.css';

const Transcription = props => {
  const [ transcription, setTranscription ] = useState(null);
  const [ playerVars, setPlayerVars ] = useState({});

  const { getTranscriptionById, acceptTranscription, deleteTranscription } = useContext(TranscriptionContext);

  useEffect(() => {
    const _getTranscriptionById = async id => {
      const _transcription = await getTranscriptionById(id);
      if(_transcription.transcriptionRequest.userId !== parseInt(localStorage.getItem('current_user'))) {
        setTranscription(false);
      }
      else {
        setTranscription(_transcription);
      }
    };

    _getTranscriptionById(props.match.params.transcriptionId);
  }, [ props.match.params.transcriptionId ]);

  useEffect(() => {
    if(transcription) {
      const _playerVars = {
        start: transcription.transcriptionRequest.startTime,
        end: transcription.transcriptionRequest.endTime,
      };
      setPlayerVars(_playerVars);
    }
  }, [ transcription ]);

  const handleRejectTranscription = async () => {
    await deleteTranscription(transcription.id);
    props.history.push('/dashboard');
  };

  const handleAcceptTranscription = async () => {
    const _transcription = await acceptTranscription(transcription.id);
    setTranscription(_transcription);
  };

  if(transcription === false) {
    return (
      <div className="transcriptionWrapper">
        <FormattedMessage id="transcription.invalidUserWarning"
          defaultMessage="Nuh uh you shouldn't be looking at that it belongs to another user" />
      </div>
    );
  }

  if(transcription === null) {
    return (
      <div className="transcriptionWrapper">
        <FormattedMessage id="transcription.loadingMessage"
          defaultMessage="Loading..." />
      </div>
    );
  }

  let actionButtons = null;
  if(!transcription.isAccepted) {
    actionButtons = (
      <div className="transcription__actionButtonsWrapper">
        <button className="btn btn--delete transcription__actionButton" onClick={handleRejectTranscription}>
          <FormattedMessage id="transcription.rejectTranscriptionButton"
            defaultMessage="Reject Transcription" />
        </button>
        <button className="btn btn--create transcription__actionButton" onClick={handleAcceptTranscription}>
          <FormattedMessage id="transcription.acceptTranscriptionButton"
            defaultMessage="Accept Transcription" />
        </button>
      </div>
    );
  }

  const youTubePlayerOpts = {
    height: '390',
    width: '640'
  };

  return (
    <div className="transcription">
      <YouTubePlayer videoId={transcription.transcriptionRequest.videoId} opts={{ ...youTubePlayerOpts, playerVars }} />
      <h2 className="transcription__header">
        <FormattedMessage id="transcription.header"
          defaultMessage="Transcription" />
      </h2>
      <p className="transcription__author">
        <FormattedMessage id="transcription.authorLabel"
          defaultMessage="Transcribed by: " /> 
          {transcription.user.firstName}
      </p>
      <p className="transcription__text">{transcription.transcription}</p>
      { actionButtons }
    </div>
  );
};

export default Transcription;