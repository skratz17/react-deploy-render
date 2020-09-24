import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './TranscriptionForSegment.css';

const TranscriptionForSegment = props => {
  const { transcription } = props;

  return (
    <div className={`transcriptionForSegment ${transcription && transcription.transcription ? '' : 'hidden'}`}>
      <h3 className="transcriptionForSegment__header">
        <FormattedMessage id="transcriptionForSegment.header"
          defaultMessage="Transcription of Current Segment" />
      </h3>
      { transcription && 
        <>
          <p className="transcriptionForSegment__author">
            <FormattedMessage id="transcriptionForSegment.authorLabel"
              defaultMessage="Transcribed by: {name}" 
              values={{
                name: transcription.user.firstName,
              }} 
            />
          </p>
          <p className="transcriptionForSegment__text">{transcription.transcription}</p>
        </>
      }
    </div>
  );
};

TranscriptionForSegment.propTypes = {
  transcription: PropTypes.object
};

export default TranscriptionForSegment;