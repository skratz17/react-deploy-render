import React, { createContext, useState } from 'react';

export const TranscriptionContext = createContext();

export const TranscriptionProvider = props => {
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
      saveTranscription
    }}>{props.children}</TranscriptionContext.Provider>
  );
};