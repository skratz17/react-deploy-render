import React from 'react';

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
    <div className="youtubeSearchBarWrapper">
      <input type="text" 
        className="youtubeSearchBar"
        placeholder="Enter a YouTube video URL or video ID"
        value={value}
        onChange={handleChange} />
    </div>
  );
};

export default YouTubeSearchBar;