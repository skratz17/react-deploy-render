import React from 'react';
import PropTypes from 'prop-types';

import TranscriptionRequestCard from '../TranscriptionRequestCard/TranscriptionRequestCard';
import './TranscriptionRequestList.css';

const TranscriptionRequestList = props => {
  const { transcriptionRequests, shouldHideVideoPreview, onActivate, columns } = props;

  return (
    <div className={`transcriptionRequestList transcriptionRequestList--${columns || 1}`}>
      { transcriptionRequests.map(tR => (
        <TranscriptionRequestCard key={tR.id} transcriptionRequest={tR} shouldHideVideoPreview={shouldHideVideoPreview} onActivate={onActivate} />
      ))}
    </div>
  );
};

TranscriptionRequestList.propTypes = {
  transcriptionRequests: PropTypes.array,
  shouldHideVideoPreview: PropTypes.bool,
  onActivate: PropTypes.func,
  columns: PropTypes.number
};

export default TranscriptionRequestList;