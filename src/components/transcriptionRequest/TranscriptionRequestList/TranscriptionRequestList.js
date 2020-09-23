import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TranscriptionRequestCard from '../TranscriptionRequestCard/TranscriptionRequestCard';
import './TranscriptionRequestList.css';

const TranscriptionRequestList = props => {
  const { transcriptionRequests, shouldHideVideoPreview, shouldPaginate, onActivate, columns } = props;

  const [ displayedRows, setDisplayedRows ] = useState(shouldPaginate ? 1 : null);

  return <>
    <div className={`transcriptionRequestList transcriptionRequestList--${columns || 1}`}>
      { transcriptionRequests
        .slice(0, displayedRows !== null ? displayedRows * columns : transcriptionRequests.length)
        .map(tR => (
          <TranscriptionRequestCard key={tR.id} transcriptionRequest={tR} shouldHideVideoPreview={shouldHideVideoPreview} onActivate={onActivate} />
      ))}
    </div>
    { shouldPaginate && (displayedRows * columns) < transcriptionRequests.length &&
      <button onClick={() => setDisplayedRows(displayedRows => displayedRows + 1)} className="btn transcriptionRequestList__loadMoreButton">
        <FormattedMessage id="transcriptionRequestList.loadMoreButton"
          defaultMessage="Load More" />
      </button>
    }
  </>;
};

TranscriptionRequestList.propTypes = {
  transcriptionRequests: PropTypes.array,
  shouldHideVideoPreview: PropTypes.bool,
  shouldPaginate: PropTypes.bool,
  onActivate: PropTypes.func,
  columns: PropTypes.number
};

export default TranscriptionRequestList;