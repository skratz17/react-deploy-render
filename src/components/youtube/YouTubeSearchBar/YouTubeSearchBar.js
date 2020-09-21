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