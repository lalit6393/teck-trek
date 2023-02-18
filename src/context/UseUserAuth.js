import { createContext, useContext} from "react";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  
  const backendUrl = 'http://localhost:3000';

  return (
    <UserAuthContext.Provider
      value={{
        backendUrl
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
