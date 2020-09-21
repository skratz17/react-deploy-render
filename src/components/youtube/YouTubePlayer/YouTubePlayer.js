import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import YouTube from 'react-youtube';

import './YouTubePlayer.css';

const YouTubePlayer = props => {
  const { opts, showResetButton } = props;

  const [ isRefreshing, setIsRefreshing ] = useState(false);
  const [ isAutoplay, setIsAutoplay ] = useState(false);

  const expandedOpts = { ...opts };
  if(!expandedOpts.playerVars) expandedOpts.playerVars = {};
  expandedOpts.playerVars = {
    ...expandedOpts.playerVars,
    autoplay: isAutoplay ? 1 : 0,
    controls: showResetButton ? 0 : 1
  };

  useEffect(() => {
    if(isRefreshing) {
      setIsAutoplay(true);
      const timeoutId = setTimeout(() => setIsRefreshing(false), 50);
      return () => clearTimeout(timeoutId);
    }
  }, [ isRefreshing ]);

  return (
    <div className="youTubePlayerWrapper">
      <div style={{ height: opts.height + 'px', width: opts.width + 'px' }}>
        { !isRefreshing && <YouTube {...props} opts={expandedOpts} /> }
      </div>
      { showResetButton && 
        <button className="btn btn--action youTubePlayer__restart" onClick={() => setIsRefreshing(true)}>
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