import React, { useState, useEffect, useContext } from 'react';
import YouTube from 'react-youtube';

import { TranscriptionContext } from '../TranscriptionProvider';

const Transcription = props => {
  const [ transcription, setTranscription ] = useState(null);
  const [ playerVars, setPlayerVars ] = useState({});

  const { getTranscriptionById } = useContext(TranscriptionContext);

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
  }, []);

  useEffect(() => {
    if(transcription) {
      const _playerVars = {
        start: transcription.transcriptionRequest.startTime,
        end: transcription.transcriptionRequest.endTime,
      };
      setPlayerVars(_playerVars);
    }
  }, [ transcription ]);

  if(transcription === false) {
    return (
      <div className="transcriptionWrapper">
        Nuh uh you shouldn't be looking at that it belongs to another user 
      </div>
    );
  }

  if(transcription === null) {
    return (
      <div className="transcriptionWrapper">Loading...</div>
    );
  }

  let actionButtons = null;
  if(!transcription.isAccepted) {
    actionButtons = (
      <div className="transcription__actionButtonsWrapper">
        <button className="transcription__actionButton">Reject Transcription</button>
        <button className="transcription__actionButton">Accept Transcription</button>
      </div>
    );
  }

  return (
    <div className="transcriptionWrapper">
      <YouTube videoId={transcription.transcriptionRequest.videoId} opts={{ playerVars }} />
      <h2 className="transcription__header">Transcription</h2>
      <p className="transcription__text">{transcription.transcription}</p>
      { actionButtons }
    </div>
  );
};

export default Transcription;