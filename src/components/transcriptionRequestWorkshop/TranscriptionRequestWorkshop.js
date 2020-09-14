import React, { useState } from 'react';
import YouTube from 'react-youtube';

import YouTubeSearchBar from '../youTubeSearchBar/YouTubeSearchBar';

const TranscriptionRequestWorkshop = () => {
  const [ videoId, setVideoId ] = useState('');

  return (
    <section className="workshop">
      <YouTubeSearchBar value={videoId} onChange={setVideoId} />
      <YouTube videoId={videoId} />
    </section>
  );
};

export default TranscriptionRequestWorkshop;