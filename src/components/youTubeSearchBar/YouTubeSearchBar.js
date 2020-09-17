import React from 'react';
import PropTypes from 'prop-types';

import './YouTubeSearchBar.css';

const YouTubeSearchBar = props => {
  const { value, onChange } = props;

  const handleChange = e => {
    try {
      const youtubeURL = new URL(e.target.value);
      onChange(youtubeURL.searchParams.get('v'));
    }
    catch {
      onChange(e.target.value);
    }
  };

  return (
    <div className="youTubeSearchBarWrapper">
      <input type="text" 
        className="youTubeSearchBar"
        placeholder="Enter a YouTube video URL or video ID"
        value={value}
        onChange={handleChange} />
    </div>
  );
};

YouTubeSearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default YouTubeSearchBar;