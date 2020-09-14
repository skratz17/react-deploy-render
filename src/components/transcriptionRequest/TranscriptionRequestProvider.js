import React, { useState, createContext } from 'react';

export const TranscriptionRequestContext = createContext();

export const TranscriptionRequestProvider = props => {
  const [ transcriptionRequests, setTranscriptionRequests ] = useState([]);

  const getTranscriptionRequests = async () => {
    const res = await fetch('http://localhost:8088/transcriptionRequests');
    const _transcriptionRequests = await res.json();
    setTranscriptionRequests(_transcriptionRequests);
  };

  const saveTranscriptionRequest = async transcriptionRequest => {
    transcriptionRequest.userId = parseInt(localStorage.getItem('current_user'));
    await fetch('http://localhost:8088/transcriptionRequests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transcriptionRequest)
    });
    await getTranscriptionRequests();
  };

  return (
    <TranscriptionRequestContext.Provider value={{
      transcriptionRequests, getTranscriptionRequests, saveTranscriptionRequest
    }}>{props.children}</TranscriptionRequestContext.Provider>
  );
};