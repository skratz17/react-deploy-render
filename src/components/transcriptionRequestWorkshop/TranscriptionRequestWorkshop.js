import React, { useEffect, useState, useContext } from 'react';
import YouTube from 'react-youtube';

import { TranscriptionRequestContext } from '../transcriptionRequest/TranscriptionRequestProvider';
import YouTubeSearchBar from '../youtube/YouTubeSearchBar/YouTubeSearchBar';
import YouTubePlayer from '../youtube/YouTubePlayer/YouTubePlayer';
import TranscriptionForSegment from './TranscriptionForSegment/TranscriptionForSegment';
import TranscriptionRequestControl from './TranscriptionRequestControl/TranscriptionRequestControl';
import TranscriptionRequestRecordingPreview from './TranscriptionRequestRecordingPreview/TranscriptionRequestRecordingPreview';
import TranscriptionRequestList from '../transcriptionRequest/TranscriptionRequestList/TranscriptionRequestList';
import TranscriptionRequestActivationWizard from '../transcriptionRequest/TranscriptionRequestActivationWizard/TranscriptionRequestActivationWizard';
import './TranscriptionRequestWorkshop.css';

const TranscriptionRequestWorkshop = () => {
  const [ player, setPlayer ] = useState(null);
  const [ videoId, setVideoId ] = useState('');
  const [ isVideoPlaying, setIsVideoPlaying ] = useState(false);
  const [ startTime, setStartTime ] = useState(null);
  const [ currentPlayerTime, setCurrentPlayerTime ] = useState(null);
  const [ transcriptionRequestsForVideo, setTranscriptionRequestsForVideo ] = useState([]);
  const [ activatingTranscriptionRequestId, setActivatingTranscriptionRequestId ] = useState(null);

  const { transcriptionRequests, getTranscriptionRequests, saveTranscriptionRequest } = useContext(TranscriptionRequestContext);

  useEffect(() => {
    getTranscriptionRequests();
  }, []);

  useEffect(() => {
    const _transcriptionRequestsForVideo = transcriptionRequests
      .filter(tR => tR.videoId === videoId)
      .sort((a, b) => a.startTime - b.startTime);
    setTranscriptionRequestsForVideo(_transcriptionRequestsForVideo);
  }, [ transcriptionRequests, videoId ]);

  useEffect(() => {
    if(isVideoPlaying) {
      const intervalId = setInterval(() => {
        setCurrentPlayerTime(Math.ceil(player.getCurrentTime()));
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [ isVideoPlaying, player ]);

  const handleYouTubeSearchBarChange = videoId => {
    setVideoId(videoId);
    setStartTime(null);
  };

  const handleYouTubeStateChange = e => {
    setIsVideoPlaying(e.data === YouTube.PlayerState.PLAYING);
    setCurrentPlayerTime(Math.ceil(player.getCurrentTime()));
  };

  const handleTranscriptionRequestControlClick = async () => {
    const timeClicked = player.getCurrentTime();
    const roundedTime = startTime === null ? Math.floor(timeClicked) : Math.ceil(timeClicked);

    if(startTime === null) {
      setStartTime(roundedTime);
    }
    else {
      const transcriptionRequestData = {
        videoId,
        startTime: startTime,
        endTime: roundedTime
      };

      await saveTranscriptionRequest(transcriptionRequestData);
      setStartTime(null);
    }
  };

  const youtubePlayerOpts = { 
    height: '390',
    width: '640'
  };

  const transcriptionRequestForSegment = transcriptionRequestsForVideo.find(tR =>
    tR.startTime <= currentPlayerTime && tR.endTime >= currentPlayerTime
  ) || { transcriptions: [] };

  return <>
    <section className="workshop">
      <div className="col--left">
        <YouTubeSearchBar value={videoId} onChange={handleYouTubeSearchBarChange} />

        <YouTubePlayer videoId={videoId} 
          onReady={e => setPlayer(e.target)} 
          onStateChange={handleYouTubeStateChange}
          opts={youtubePlayerOpts}
          />

        <TranscriptionForSegment 
          transcription={transcriptionRequestForSegment.transcriptions[0]} 
        />
      </div>

      <div className="col--right">
        <TranscriptionRequestControl 
          isRequesting={startTime !== null} 
          disabled={!isVideoPlaying || startTime >= currentPlayerTime}
          onCancel={() => setStartTime(null)}
          onClick={handleTranscriptionRequestControlClick} />

        <TranscriptionRequestRecordingPreview
          startTime={startTime}
          endTime={currentPlayerTime} />

        <TranscriptionRequestList 
          onActivate={setActivatingTranscriptionRequestId}
          transcriptionRequests={transcriptionRequestsForVideo.filter(tR => tR.userId === parseInt(localStorage.getItem('current_user')))} 
          columns={1}
          shouldHideVideoPreview={true} />
      </div>
    </section>

    <TranscriptionRequestActivationWizard 
      transcriptionRequestId={activatingTranscriptionRequestId} 
      onClose={() => setActivatingTranscriptionRequestId(null)} />
  </>;
};

export default TranscriptionRequestWorkshop;