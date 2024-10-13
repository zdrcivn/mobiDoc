import axios from 'axios';
import React, {createContext, useState} from 'react';
import {BASE_URL, BASE_URL1} from '../utils/config';
export const AuthContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});

  const login = (email, password) => {
    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then(res => {
        let user = res.data;
        AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        console.log('User login');
      })
      .catch(err => {
        alert('Error username or password!', err.message);
      });
  };

  const logout = () => {
    AsyncStorage.removeItem('user');
    setUser({});
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{login, user, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
