import React, { createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
  const getUserByEmail = async email => {
    const res = await fetch(`http://localhost:8088/users?email=${email}`);
    const users = await res.json();
    return users.length ? users[0] : false;
  };

  const getUserById = async id => {
    const res = await fetch(`http://localhost:8088/users/${id}`);
    const user = await res.json();
    return user;
  };

  const saveUser = async userData => {
    const res = await fetch('http://localhost:8088/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const newUser = await res.json();
    return newUser;
  };

  return (
    <UserContext.Provider value={{
      getUserByEmail, getUserById, saveUser
    }}>
      {props.children}
    </UserContext.Provider>
  );
};