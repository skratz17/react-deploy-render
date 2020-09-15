import React from 'react';
import PropTypes from 'prop-types';

import TranscriptionRequestCard from '../TranscriptionRequestCard/TranscriptionRequestCard';

const TranscriptionRequestList = props => {
  const { transcriptionRequests, shouldHideVideoPreview, onActivate } = props;

  return (
    <div className="transcriptionRequestList">
      { transcriptionRequests.map(tR => (
        <TranscriptionRequestCard key={tR.id} transcriptionRequest={tR} shouldHideVideoPreview={shouldHideVideoPreview} onActivate={onActivate} />
      ))}
    </div>
  );
};

TranscriptionRequestList.propTypes = {
  transcriptionRequests: PropTypes.array,
  shouldHideVideoPreview: PropTypes.bool,
  onActivate: PropTypes.func
};

export default TranscriptionRequestList;