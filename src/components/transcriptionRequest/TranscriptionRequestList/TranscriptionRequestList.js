import React from 'react';
import PropTypes from 'prop-types';

const TranscriptionRequestList = props => {
  const { transcriptionRequests, onActivate } = props;

  return (
    <div className="transcriptionRequestList">
      { transcriptionRequests.map(tR => (
        <div>tr</div>
      ))}
    </div>
  );
};

TranscriptionRequestList.propTypes = {
  transcriptionRequests: PropTypes.array,
  onActivate: PropTypes.func
};