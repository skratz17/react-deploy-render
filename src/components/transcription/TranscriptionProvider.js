import React, { createContext } from 'react';

export const TranscriptionContext = createContext();

export const TranscriptionProvider = props => {
  const getTranscriptionById = async id => {
    const res = await fetch(`http://localhost:8088/transcriptions/${id}?_expand=transcriptionRequest`);
    const transcription = await res.json();
    return transcription;
  };

  const saveTranscription = async transcriptionData => {
    transcriptionData.timestamp = Date.now();
    transcriptionData.isAccepted = false;

    const res = await fetch('http://localhost:8088/transcriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transcriptionData)
    });
    const transcription = await res.json();
    return transcription;
  };

  return (
    <TranscriptionContext.Provider value={{
      getTranscriptionById, saveTranscription
    }}>{props.children}</TranscriptionContext.Provider>
  );
};