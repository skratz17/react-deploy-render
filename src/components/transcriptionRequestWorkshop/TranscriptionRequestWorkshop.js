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
  const [ transcriptionRequestsForVideo, setTranscriptionRequestsForVideo ] = useState([]);
  const [ activatingTranscriptionRequestId, setActivatingTranscriptionRequestId ] = useState(null);

  const { transcriptionRequests, getTranscriptionRequests, saveTranscriptionRequest } = useContext(TranscriptionRequestContext);

  useEffect(() => {
    getTranscriptionRequests();
  }, []);

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
      setStartTime(timeClicked);
    }
    else {
      const transcriptionRequestData = {
        videoId,
        startTime: Math.floor(startTime),
        endTime: Math.ceil(timeClicked)
      };

      await saveTranscriptionRequest(transcriptionRequestData);
      setStartTime(null);
    }
  };

  return (
    <section className="workshop">
      <YouTubeSearchBar value={videoId} onChange={handleYouTubeSearchBarChange} />
      <YouTube videoId={videoId} onReady={e => setPlayer(e.target)} />

      <TranscriptionRequestControl isRequesting={startTime !== null} onClick={handleTranscriptionRequestControlClick} />

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