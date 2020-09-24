import React, { createContext, useContext, useState } from 'react';

import { ApiContext } from '../../ApiProvider';

export const LanguageContext = createContext();

export const LanguageProvider = props => {
  const [ languages, setLanguages ] = useState([]);

  const API_URL = useContext(ApiContext);
  
  const getLanguages = async () => {
    const res = await fetch(`${API_URL}/languages`);
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