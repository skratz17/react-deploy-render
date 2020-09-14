import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = props => {
  const [ languages, setLanguages ] = useState([]);
  
  const getLanguages = async () => {
    const res = await fetch('http://localhost:8088/languages');
    const _languages = await res.json();
    setLanguages(_languages);
  };

  return (
    <LanguageContext.Provider value={{
      languages, getLanguages
    }}>
      {props.children}
    </LanguageContext.Provider>
  );
};