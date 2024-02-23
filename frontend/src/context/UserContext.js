import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [childMethods, setChildMethods] = useState({});

  console.log(user);


  return (
    <UserContext.Provider value={{ user, setUser, childMethods, setChildMethods}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);