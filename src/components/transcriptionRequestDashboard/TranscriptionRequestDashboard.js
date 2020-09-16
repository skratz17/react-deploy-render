import React, { useState, useContext, useEffect } from 'react';

import { TranscriptionRequestContext } from '../transcriptionRequest/TranscriptionRequestProvider';
import TranscriptionRequestList from '../transcriptionRequest/TranscriptionRequestList/TranscriptionRequestList';
import TranscriptionRequestActivationWizard from '../transcriptionRequest/TranscriptionRequestActivationWizard/TranscriptionRequestActivationWizard';

const TranscriptionRequestDashboard = () => {
  const [ transcriptionRequestsForUser, setTranscriptionRequestsForUser ] = useState([]);
  const [ activatingTranscriptionRequestId, setActivatingTranscriptionRequestId ] = useState(null);

  const { transcriptionRequests, getTranscriptionRequests } = useContext(TranscriptionRequestContext);

  useEffect(() => {
    getTranscriptionRequests();
  }, []);

  useEffect(() => {
    const _transcriptionRequestsForUser = transcriptionRequests.filter(tR => tR.userId === parseInt(localStorage.getItem('current_user')));
    setTranscriptionRequestsForUser(_transcriptionRequestsForUser);
  }, [ transcriptionRequests ]);

  const dashboardConfig = [
    { header: 'New Transcriptions', filterFunction: tR => tR.transcriptions.length && tR.transcriptions.every(t => !t.isAccepted) },
    { header: 'Unactivated Transcription Requests', filterFunction: tR => !tR.isActivated },
    { header: 'Transcription Requests Awaiting Transcription', filterFunction: tR => tR.isActivated && tR.transcriptions.length === 0 },
    { header: 'All Fulfilled Transcription Requests', filterFunction: tR => tR.transcriptions.length }
  ]

  return (
    <div className="transcriptionRequestDashboardWrapper">
      {
        dashboardConfig.map(({ header, filterFunction }) => (
          <div key={header} className="transcriptionRequestDashboard__listWrapper">
            <h3 className="transcriptionRequestDashboard__listHeader">{header}</h3>
            <TranscriptionRequestList transcriptionRequests={transcriptionRequestsForUser.filter(filterFunction)} 
              onActivate={setActivatingTranscriptionRequestId} />
          </div>
        ))
      }

      <TranscriptionRequestActivationWizard transcriptionRequestId={activatingTranscriptionRequestId} />
    </div>
  )
};

export default TranscriptionRequestDashboard;