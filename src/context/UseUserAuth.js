import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {

  const [visited, setVisited] = useState(localStorage.getItem("visited"));
  const [user, setUser] = useState({username: localStorage.getItem('username')} ||null);
  const [loading, setLoading] = useState(false);
  const backendUrl = "http://localhost:3000";


  const signup = (data) => {
    return new Promise((resolve, reject) => {
      // axios.post(`${backendUrl}/signup`, data)
      //   .then((res) => {
      //     console.log("res data",res.data);
      //     resolve(res.data);
      //   })
      //   .catch((err) => reject(err));

      //Backend not connected yet
      setTimeout(() => {
        resolve("success");
      }, 2000);
    });
  };

  const login = (data) => {
    return new Promise((resolve, reject) => {
      // axios.post(`${backendUrl}/login`, data)
      //   .then((res) => {
      //     console.log("res data",res.data);
      //     resolve(res.data);
      //   })
      //   .catch((err) => reject(err));

      //Backend not connected yet
      setTimeout(() => {
        resolve("success");
      }, 2000);
    });
  };




  return (
    <UserAuthContext.Provider
      value={{
        backendUrl,
        user,
        loading,
        signup,
        login,
        setUser,
        visited
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
