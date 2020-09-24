import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import YouTube from 'react-youtube';

import './YouTubePlayer.css';

const YouTubePlayer = props => {
  const { opts, showResetButton } = props;

  const [ isRefreshing, setIsRefreshing ] = useState(false);
  const [ isAutoplay, setIsAutoplay ] = useState(false);
  const [ hasPlayed, setHasPlayed ] = useState(false);

  const expandedOpts = { ...opts, height: '100%', width: '100%' };
  if(!expandedOpts.playerVars) expandedOpts.playerVars = {};
  expandedOpts.playerVars = {
    ...expandedOpts.playerVars,
    autoplay: isAutoplay ? 1 : 0,
    controls: showResetButton ? 0 : 1,
    playsinline: 1
  };

  // hacky way to make the YouTube player replay only the start-end segment, quickly de-render and re-render it :|
  useEffect(() => {
    if(isRefreshing) {
      setIsAutoplay(true);
      const timeoutId = setTimeout(() => setIsRefreshing(false), 50);
      return () => clearTimeout(timeoutId);
    }
  }, [ isRefreshing ]);

  const handleStateChange = e => {
    if(e.data === YouTube.PlayerState.PLAYING) {
      setHasPlayed(true);
    }
    if(props.onStateChange) {
      props.onStateChange(e);
    }
  };

  return (
    <div className="youTubePlayerWrapper">
      {/* <div style={{ height: opts.height + 'px', width: opts.width + 'px' }}> */}
      <div className={`youTubePlayerWrapper__player--${props.size}`}>
        { !isRefreshing && <YouTube {...props} opts={expandedOpts} onStateChange={handleStateChange} /> }
      </div>
      { showResetButton && 
        <button className={`btn btn--neutral youTubePlayer__restart ${hasPlayed ? '' : 'hidden'}`} onClick={() => setIsRefreshing(true)}>
          <FormattedMessage id="youTubePlayer.replayButton"
            defaultMessage="Replay Segment" />
        </button>
      }
    </div>
  );
};

// all props that can be passed to YouTube are valid to pass to YouTube player... we'll just let that component handle proptypes validation for its props
YouTubePlayer.propTypes = {
  showResetButton: PropTypes.bool
};

export default YouTubePlayer;