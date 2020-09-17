import React, { useEffect, useState, useContext } from 'react';
import YouTube from 'react-youtube';
import { TranscriptionRequestContext } from '../transcriptionRequest/TranscriptionRequestProvider';

import YouTubeSearchBar from '../youTubeSearchBar/YouTubeSearchBar';
import TranscriptionRequestControl from './TranscriptionRequestControl/TranscriptionRequestControl';
import TranscriptionRequestList from '../transcriptionRequest/TranscriptionRequestList/TranscriptionRequestList';
import TranscriptionRequestActivationWizard from '../transcriptionRequest/TranscriptionRequestActivationWizard/TranscriptionRequestActivationWizard';

const TranscriptionRequestWorkshop = () => {
  const [ player, setPlayer ] = useState(null);
  const [ videoId, setVideoId ] = useState('');
  const [ startTime, setStartTime ] = useState(null);
  const [ hasEndTimeError, setHasEndTimeError ] = useState(false);
  const [ transcriptionRequestsForVideo, setTranscriptionRequestsForVideo ] = useState([]);
  const [ activatingTranscriptionRequestId, setActivatingTranscriptionRequestId ] = useState(null);

  const { transcriptionRequests, getTranscriptionRequests, saveTranscriptionRequest } = useContext(TranscriptionRequestContext);

  useEffect(() => {
    getTranscriptionRequests();
  }, []);

  useEffect(() => {
    let timeoutId;
    if(hasEndTimeError) {
      timeoutId = setTimeout(() => setHasEndTimeError(false), 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [ hasEndTimeError ]);

  useEffect(() => {
    const _transcriptionRequestsForVideo = transcriptionRequests.filter(tR => 
      tR.videoId === videoId && tR.userId === parseInt(localStorage.getItem('current_user'))
    );
    setTranscriptionRequestsForVideo(_transcriptionRequestsForVideo);
  }, [ transcriptionRequests, videoId ]);

  const handleYouTubeSearchBarChange = videoId => {
    setVideoId(videoId);
    setStartTime(null);
  };

  const handleTranscriptionRequestControlClick = async () => {
    const timeClicked = player.getCurrentTime();

    if(startTime === null) {
      setStartTime(Math.floor(timeClicked));
    }
    else if(Math.ceil(timeClicked) <= startTime) {
      setHasEndTimeError(true);
    }
    else {
      setHasEndTimeError(false);

      const transcriptionRequestData = {
        videoId,
        startTime: startTime,
        endTime: Math.ceil(timeClicked)
      };

      await saveTranscriptionRequest(transcriptionRequestData);
      setStartTime(null);
    }
  };

  const handleTranscriptionRequestControlCancel = () => {
    setStartTime(null);
    setHasEndTimeError(false);
  };

  return (
    <section className="workshop">
      <YouTubeSearchBar value={videoId} onChange={handleYouTubeSearchBarChange} />
      <YouTube videoId={videoId} onReady={e => setPlayer(e.target)} />

      { hasEndTimeError && <p className="text--warning">Your segment's end time must be after the your selected start time.</p> }

      <TranscriptionRequestControl 
        isRequesting={startTime !== null} 
        onCancel={handleTranscriptionRequestControlCancel}
        onClick={handleTranscriptionRequestControlClick} />

      <TranscriptionRequestList 
        onActivate={setActivatingTranscriptionRequestId}
        transcriptionRequests={transcriptionRequestsForVideo} 
        shouldHideVideoPreview={true} />

      <TranscriptionRequestActivationWizard 
        transcriptionRequestId={activatingTranscriptionRequestId} 
        onClose={() => setActivatingTranscriptionRequestId(null)} />
    </section>
  );
};

export default TranscriptionRequestWorkshop;