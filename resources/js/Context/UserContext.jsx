import { usePage } from '@inertiajs/inertia-react';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = usePage().props;
  const [loggedInUser, setLoggedInUser] = useState(user);

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={loggedInUser}>
      {children}
    </UserContext.Provider>
  );
};