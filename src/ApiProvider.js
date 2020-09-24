import React, { createContext } from 'react';

const API_URL = 'http://localhost:8088';

export const ApiContext = createContext();

export const ApiProvider = props => (
  <ApiContext.Provider value={API_URL}>
    {props.children}
  </ApiContext.Provider>
);