import React, { createContext } from 'react';

const API_URL = 'https://uhhhwut.onrender.com/api';

export const ApiContext = createContext();

export const ApiProvider = props => (
  <ApiContext.Provider value={API_URL}>
    {props.children}
  </ApiContext.Provider>
);