import React, { createContext, useContext, useState } from 'react';

import { ApiContext } from '../../ApiProvider';

export const TranscriptionContext = createContext();

export const TranscriptionProvider = props => {
  const [ transcriptions, setTranscriptions ] = useState([]);

  const API_URL = useContext(ApiContext);

  const getTranscriptions = async () => {
    const res = await fetch(`${API_URL}/transcriptions?_expand=transcriptionRequest`);
    const _transcriptions = await res.json();
    setTranscriptions(_transcriptions);
  };

  const getTranscriptionById = async id => {
    const res = await fetch(`${API_URL}/transcriptions/${id}?_expand=transcriptionRequest&_expand=user`);
    const transcription = await res.json();
    return transcription;
  };

  const saveTranscription = async transcriptionData => {
    transcriptionData.timestamp = Date.now();
    transcriptionData.isAccepted = false;
    transcriptionData.userId = parseInt(localStorage.getItem('current_user'));

    const res = await fetch(`${API_URL}/transcriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transcriptionData)
    });
    const transcription = await res.json();
    await getTranscriptions();
    return transcription;
  };

  const acceptTranscription = async id => {
    await fetch(`${API_URL}/transcriptions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isAccepted: true })
    });
    await getTranscriptions();
    return await getTranscriptionById(id);
  };

  const deleteTranscription = async id => {
    await fetch(`${API_URL}/transcriptions/${id}`, {
      method: 'DELETE'
    });
    return await getTranscriptions();
  };

  return (
    <TranscriptionContext.Provider value={{
      transcriptions, getTranscriptionById, saveTranscription, acceptTranscription, deleteTranscription, getTranscriptions
    }}>{props.children}</TranscriptionContext.Provider>
  );
};