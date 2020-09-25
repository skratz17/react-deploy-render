import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import './YouTubeSearchBar.css';

defineMessages({
  youtubeSearchBarPlaceholder: {
    id: 'youtubeSearchBar.placeholder',
    defaultMessage: 'Enter a YouTube video URL or video ID'
  }
});

const YouTubeSearchBar = props => {
  const { value, onChange } = props;

  const getVideoIdFromYouTubeURL = youTubeUrl => {
    if(youTubeUrl.searchParams.has('v')) {
      return youTubeUrl.searchParams.get('v');
    }
    else {
      return youTubeUrl.pathname.substring(1);
    }
  };

  const handleChange = e => {
    try {
      const url = new URL(e.target.value);

      if(url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com' || url.hostname === 'youtu.be') {
        const videoId = getVideoIdFromYouTubeURL(url);
        onChange(videoId);
      }
      else {
        onChange(e.target.value);
      }
    }
    catch {
      onChange(e.target.value);
    }
  };

  return (
    <div className="youTubeSearchBarWrapper">
      <input type="text" 
        className="youTubeSearchBar"
        placeholder={props.intl.formatMessage({ id: 'youtubeSearchBar.placeholder' })}
        value={value}
        onChange={handleChange} />
    </div>
  );
};

YouTubeSearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default injectIntl(YouTubeSearchBar);