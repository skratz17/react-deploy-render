import React, { useState, useContext, createContext } from 'react';

import { ApiContext } from '../../ApiProvider';

export const TranscriptionRequestContext = createContext();

export const TranscriptionRequestProvider = props => {
  const [ transcriptionRequests, setTranscriptionRequests ] = useState([]);

  const API_URL = useContext(ApiContext);

  const getTranscriptionRequests = async () => {
    const res = await fetch(`${API_URL}/transcriptionRequests?_embed=transcriptions`);
    const _transcriptionRequests = await res.json();
    setTranscriptionRequests(_transcriptionRequests);
  };

  const getTranscriptionRequestById = async id => {
    const res = await fetch(`${API_URL}/transcriptionRequests/${id}`);
    const transcriptionRequest = await res.json();
    return transcriptionRequest;
  };

  const getTranscriptionRequestToFulfillForLanguage = async languageId => {
    const res = await fetch(`${API_URL}/transcriptionRequests?_embed=transcriptions&languageId=${languageId}&userId_ne=${localStorage.getItem('current_user')}&_sort=timestamp&isActivated=true`);
    const candidates = await res.json();
    return candidates.find(tR => tR.transcriptions.length === 0) || false;
  };

  const saveTranscriptionRequest = async transcriptionRequest => {
    transcriptionRequest.userId = parseInt(localStorage.getItem('current_user'));
    transcriptionRequest.isActivated = false;

    await fetch(`${API_URL}/transcriptionRequests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transcriptionRequest)
    });
    await getTranscriptionRequests();
  };

  const updateTranscriptionRequest = async (id, transcriptionRequestData) => {
    await fetch(`${API_URL}/transcriptionRequests/${id}`, {
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

  const deleteTranscriptionRequest = async id => {
    await fetch(`${API_URL}/transcriptionRequests/${id}`, {
      method: 'DELETE'
    });
    await getTranscriptionRequests();
  };

  return (
    <TranscriptionRequestContext.Provider value={{
      transcriptionRequests, getTranscriptionRequests, saveTranscriptionRequest, getTranscriptionRequestById, updateTranscriptionRequest, getTranscriptionRequestToFulfillForLanguage, activateTranscriptionRequest, deleteTranscriptionRequest
    }}>{props.children}</TranscriptionRequestContext.Provider>
  );
};