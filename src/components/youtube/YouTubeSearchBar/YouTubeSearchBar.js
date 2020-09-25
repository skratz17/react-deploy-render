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

    // url of the form www.youtube.com/watch?v=VIDEO_ID
    if(youTubeUrl.searchParams.has('v')) {
      return youTubeUrl.searchParams.get('v');
    }

    // shortened url of the form youtu.be/VIDEO_ID
    else {
      return youTubeUrl.pathname.substring(1);
    }
  };

  const handleChange = e => {

    // try to parse the input as a URL
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

    // URL constructor throws an error if supplied string is not a valid URL - just send up the user input in this case
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