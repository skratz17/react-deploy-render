import React, { useState, useContext, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { TranscriptionRequestContext } from '../transcriptionRequest/TranscriptionRequestProvider';
import TranscriptionRequestList from '../transcriptionRequest/TranscriptionRequestList/TranscriptionRequestList';
import TranscriptionRequestActivationWizard from '../transcriptionRequest/TranscriptionRequestActivationWizard/TranscriptionRequestActivationWizard';
import './TranscriptionRequestDashboard.css';
import { TranscriptionContext } from '../transcription/TranscriptionProvider';
import TranscriptionRequestDashboardData from './TranscriptionRequestDashboardData/TranscriptionRequestDashboardData';

const TranscriptionRequestDashboard = () => {
  const [ activatingTranscriptionRequestId, setActivatingTranscriptionRequestId ] = useState(null);

  const { transcriptionRequests, getTranscriptionRequests } = useContext(TranscriptionRequestContext);
  const { transcriptions, getTranscriptions } = useContext(TranscriptionContext);

  useEffect(() => {
    getTranscriptionRequests();
    getTranscriptions();
  }, []);

  const dashboardConfig = [
    { 
      header: <FormattedMessage id="transcriptionRequestDashboard.newTranscriptionsHeader" defaultMessage="New Transcriptions" />, 
      filterFunction: tR => tR.transcriptions.length && tR.transcriptions.every(t => !t.isAccepted) 
    },
    { 
      header: <FormattedMessage id="transcriptionRequestDashboard.unactivatedTranscriptionRequestsHeader" defaultMessage="Unactivated Transcription Requests" />, 
      filterFunction: tR => !tR.isActivated 
    },
    { 
      header: <FormattedMessage id="transcriptionRequestDashboard.transcriptionRequestsAwaitingTranscriptionHeader" defaultMessage="Transcription Requests Awaiting Transcription" />, 
      filterFunction: tR => tR.isActivated && tR.transcriptions.length === 0 
    },
    { 
      header: <FormattedMessage id="transcriptionRequestDashboard.allFulfilledTranscriptionRequestsHeader" defaultMessage="All Fulfilled Transcription Requests" />, 
      filterFunction: tR => tR.transcriptions.length 
    }
  ];

  const transcriptionRequestsForUser = transcriptionRequests.filter(tR => tR.userId === parseInt(localStorage.getItem('current_user')));
  const transcriptionsForUser = transcriptions.filter(t => t.userId === parseInt(localStorage.getItem('current_user')));

  return <>
    <div className="transcriptionRequestDashboard">
      <TranscriptionRequestDashboardData transcriptionRequests={transcriptionRequestsForUser}
        transcriptions={transcriptionsForUser} />
      <div className="transcriptionRequestDashboard__lists">
        {
          dashboardConfig.map(({ header, filterFunction }, index) => (
            <div key={index} className="transcriptionRequestDashboard__listWrapper">
              <h2 className="transcriptionRequestDashboard__listHeader">{header}</h2>
              <TranscriptionRequestList transcriptionRequests={transcriptionRequestsForUser.filter(filterFunction)} 
                columns={3}
                onActivate={setActivatingTranscriptionRequestId} />
            </div>
          ))
        }
      </div>

    </div>
    <TranscriptionRequestActivationWizard 
      transcriptionRequestId={activatingTranscriptionRequestId} 
      onClose={() => setActivatingTranscriptionRequestId(null)} />
  </>;
};

export default TranscriptionRequestDashboard;