import React, { useState, createContext } from 'react';

export const TranscriptionRequestContext = createContext();

export const TranscriptionRequestProvider = props => {
  const [ transcriptionRequests, setTranscriptionRequests ] = useState([]);

  const getTranscriptionRequests = async () => {
    const res = await fetch('http://localhost:8088/transcriptionRequests?_embed=transcriptions');
    const _transcriptionRequests = await res.json();
    setTranscriptionRequests(_transcriptionRequests);
  };

  const getTranscriptionRequestById = async id => {
    const res = await fetch(`http://localhost:8088/transcriptionRequests/${id}`);
    const transcriptionRequest = await res.json();
    return transcriptionRequest;
  };

  const getTranscriptionRequestToFulfillForLanguage = async languageId => {
    const res = await fetch(`http://localhost:8088/transcriptionRequests?_embed=transcriptions&languageId=${languageId}&userId_ne=${localStorage.getItem('current_user')}&_sort=timestamp&isActivated=true`);
    const candidates = await res.json();
    return candidates.find(tR => tR.transcriptions.length === 0) || false;
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

  const updateTranscriptionRequest = async (id, transcriptionRequestData) => {
    await fetch(`http://localhost:8088/transcriptionRequests/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transcriptionRequestData)
    });
    await getTranscriptionRequests();
  };

  const activateTranscriptionRequest = async id => {
    const transcriptionRequestData = {
      isActivated: true,
      timestamp: Date.now()
    };

    await updateTranscriptionRequest(id, transcriptionRequestData);
  };

  return (
    <TranscriptionRequestContext.Provider value={{
      transcriptionRequests, getTranscriptionRequests, saveTranscriptionRequest, getTranscriptionRequestById, updateTranscriptionRequest, getTranscriptionRequestToFulfillForLanguage, activateTranscriptionRequest
    }}>{props.children}</TranscriptionRequestContext.Provider>
  );
};