import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TranscriptionRequestCard from '../TranscriptionRequestCard/TranscriptionRequestCard';
import './TranscriptionRequestList.css';

const TranscriptionRequestList = props => {
  const { transcriptionRequests, shouldHideVideoPreview, shouldPaginate, onActivate, columns } = props;

  const [ renderedComponents, setRenderedComponents ] = useState(shouldPaginate ? transcriptionRequests.slice(0, columns) : transcriptionRequests);

  useEffect(() => {
    if(!shouldPaginate) setRenderedComponents(transcriptionRequests);
    else setRenderedComponents(transcriptionRequests.slice(0, renderedComponents.length));
  }, [ transcriptionRequests ]);

  const loadNextRow = () => {
    const updatedRenderedComponents = [ ...renderedComponents ];
    const startIndex = renderedComponents.length;
    for(let i = renderedComponents.length; i < transcriptionRequests.length && (i - startIndex) < columns; i++) {
      updatedRenderedComponents.push(transcriptionRequests[i]);
    }
    setRenderedComponents(updatedRenderedComponents);
  };

  return <>
    <div className={`transcriptionRequestList transcriptionRequestList--${columns || 1}`}>
      { renderedComponents.map(tR => (
        <TranscriptionRequestCard key={tR.id} transcriptionRequest={tR} shouldHideVideoPreview={shouldHideVideoPreview} onActivate={onActivate} />
      ))}
    </div>
    { shouldPaginate && renderedComponents.length < transcriptionRequests.length &&
      <button onClick={loadNextRow} className="btn btn--action transcriptionRequestList__loadMoreButton">Load More</button>
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