import React, { createContext } from 'react';

const API_URL = 'https://sounds-fishy.onrender.com/api/';

export const ApiContext = createContext();

export const ApiProvider = props => (
  <ApiContext.Provider value={API_URL}>
    {props.children}
  </ApiContext.Provider>
);