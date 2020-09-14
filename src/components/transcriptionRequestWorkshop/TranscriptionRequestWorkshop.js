import React, { useState } from 'react';
import YouTube from 'react-youtube';

import YouTubeSearchBar from '../youTubeSearchBar/YouTubeSearchBar';
import TranscriptionRequestControl from './TranscriptionRequestControl/TranscriptionRequestControl';

const TranscriptionRequestWorkshop = () => {
  const [ videoId, setVideoId ] = useState('');
  const [ startTime, setStartTime ] = useState(null);

  return (
    <section className="workshop">
      <YouTubeSearchBar value={videoId} onChange={setVideoId} />
      <YouTube videoId={videoId} />

      <TranscriptionRequestControl isRequesting={startTime} />
    </section>
  );
};

export default TranscriptionRequestWorkshop;