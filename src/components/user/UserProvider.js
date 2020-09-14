import React, { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
  const getUserByEmail = async email => {
    const res = await fetch(`http://localhost:8088/users?email=${email}`);
    const users = await res.json();
    return users.length ? users[0] : false;
  };

  return (
    <UserContext.Provider value={{
      getUserByEmail
    }}>
      {props.children}
    </UserContext.Provider>
  );
};