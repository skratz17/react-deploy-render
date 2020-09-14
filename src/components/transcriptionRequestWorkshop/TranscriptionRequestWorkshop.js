import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

import YouTubeSearchBar from '../youTubeSearchBar/YouTubeSearchBar';
import TranscriptionRequestControl from './TranscriptionRequestControl/TranscriptionRequestControl';

const TranscriptionRequestWorkshop = () => {
  const [ player, setPlayer ] = useState(null);
  const [ videoId, setVideoId ] = useState('');
  const [ startTime, setStartTime ] = useState(null);

  const handleYouTubeStateChange = e => {
    if(e.data === YouTube.PlayerState.CUED) {
      setPlayer(e.target);
    }
  };

  const handleYouTubeSearchBarChange = videoId => {
    setVideoId(videoId);
    setStartTime(null);
  };

  const handleTranscriptionRequestControlClick = () => {
    const timeClicked = player.getCurrentTime();

    if(startTime === null) {
      setStartTime(timeClicked);
    }
    else {
      const transcriptionRequestData = {
        videoId,
        startTime,
        endTime: timeClicked
      };

      console.log(transcriptionRequestData);

      setStartTime(null);
    }
  };

  return (
    <section className="workshop">
      <YouTubeSearchBar value={videoId} onChange={handleYouTubeSearchBarChange} />
      <YouTube videoId={videoId} onStateChange={handleYouTubeStateChange} />

      <TranscriptionRequestControl isRequesting={!!startTime} onClick={handleTranscriptionRequestControlClick} />
    </section>
  );
};

export default TranscriptionRequestWorkshop;