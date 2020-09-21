import React, { useEffect, useState, useContext } from 'react';
import YouTube from 'react-youtube';
import { FormattedMessage } from 'react-intl';

import { TranscriptionRequestContext } from '../transcriptionRequest/TranscriptionRequestProvider';
import YouTubeSearchBar from '../youTubeSearchBar/YouTubeSearchBar';
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
  const [ hasEndTimeError, setHasEndTimeError ] = useState(false);
  const [ transcriptionRequestsForVideo, setTranscriptionRequestsForVideo ] = useState([]);
  const [ transcriptionForSegment, setTranscriptionForSegment ] = useState(null);
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
    const _transcriptionRequestsForVideo = transcriptionRequests
      .filter(tR => 
        tR.videoId === videoId && tR.userId === parseInt(localStorage.getItem('current_user'))
      )
      .sort((a, b) => a.startTime - b.startTime);
    setTranscriptionRequestsForVideo(_transcriptionRequestsForVideo);
  }, [ transcriptionRequests, videoId ]);

  useEffect(() => {
    if(isVideoPlaying) {
      const intervalId = setInterval(() => {
        setCurrentPlayerTime(Math.ceil(player.getCurrentTime()));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [ isVideoPlaying ]);

  useEffect(() => {
    if(currentPlayerTime !== null) {
      const transcriptionRequestForSegment = transcriptionRequestsForVideo.find(
        tR => currentPlayerTime >= tR.startTime && currentPlayerTime <= tR.endTime
      );

      if(transcriptionRequestForSegment && transcriptionRequestForSegment.transcriptions && transcriptionRequestForSegment.transcriptions.length) {
        setTranscriptionForSegment(transcriptionRequestForSegment.transcriptions[0]);
      }
      else {
        setTranscriptionForSegment(null);
      }
    }
  }, [ currentPlayerTime ]);

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
    else if(roundedTime <= startTime) {
      setHasEndTimeError(true);
    }
    else {
      setHasEndTimeError(false);

      const transcriptionRequestData = {
        videoId,
        startTime: startTime,
        endTime: roundedTime
      };

      await saveTranscriptionRequest(transcriptionRequestData);
      setStartTime(null);
    }
  };

  const handleTranscriptionRequestControlCancel = () => {
    setStartTime(null);
    setHasEndTimeError(false);
  };

  const youtubePlayerOpts = { 
    height: '390',
    width: '640'
  };

  return <>
    <section className="workshop">
      <div className="col--left">
        <YouTubeSearchBar value={videoId} onChange={handleYouTubeSearchBarChange} />

        <div style={{ height: youtubePlayerOpts.height + 'px', width: youtubePlayerOpts.width + 'px' }}>
          <YouTube videoId={videoId} 
            onReady={e => setPlayer(e.target)} 
            onStateChange={handleYouTubeStateChange}
            opts={youtubePlayerOpts}
            />
        </div>

        <TranscriptionForSegment transcription={transcriptionForSegment} />
      </div>

      <div className="col--right">
        { hasEndTimeError && 
          <p className="text--warning">
            <FormattedMessage id="transcriptionRequestWorkshop.invalidEndTimeWarning"
              defaultMessage="Your segment's end time must be after the your selected start time." />
          </p> 
        }

        <TranscriptionRequestControl 
          isRequesting={startTime !== null} 
          disabled={!isVideoPlaying}
          onCancel={handleTranscriptionRequestControlCancel}
          onClick={handleTranscriptionRequestControlClick} />

        <TranscriptionRequestRecordingPreview
          startTime={startTime}
          endTime={currentPlayerTime} />

        <TranscriptionRequestList 
          onActivate={setActivatingTranscriptionRequestId}
          transcriptionRequests={transcriptionRequestsForVideo} 
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