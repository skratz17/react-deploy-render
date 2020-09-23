import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
  const [ users, setUsers ] = useState([]);

  const getUsers = async () => {
    const res = await fetch('http://localhost:8088/users');
    const _users = await res.json();
    setUsers(_users);
  };

  const getUserByEmail = async email => {
    const res = await fetch(`http://localhost:8088/users?email=${email}`);
    const _users = await res.json();
    return _users.length ? _users[0] : false;
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
      users, getUserByEmail, getUserById, getUsers, saveUser
    }}>
      {props.children}
    </UserContext.Provider>
  );
};