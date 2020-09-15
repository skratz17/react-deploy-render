import React, { useState, createContext } from 'react';

export const TranscriptionRequestContext = createContext();

export const TranscriptionRequestProvider = props => {
  const [ transcriptionRequests, setTranscriptionRequests ] = useState([]);

  const getTranscriptionRequests = async () => {
    const res = await fetch('http://localhost:8088/transcriptionRequests?_embed=transcription');
    const _transcriptionRequests = await res.json();
    setTranscriptionRequests(_transcriptionRequests);
  };

  const getTranscriptionRequestById = async id => {
    const res = await fetch(`http://localhost:8088/transcriptionRequests/${id}`);
    const transcriptionRequest = await res.json();
    return transcriptionRequest;
  };

  const saveTranscriptionRequest = async transcriptionRequest => {
    transcriptionRequest.userId = parseInt(localStorage.getItem('current_user'));
    transcriptionRequest.isActivated = false;

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
      transcriptionRequests, getTranscriptionRequests, saveTranscriptionRequest, getTranscriptionRequestById
    }}>{props.children}</TranscriptionRequestContext.Provider>
  );
};