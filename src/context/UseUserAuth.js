import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [visited, setVisited] = useState(
    localStorage.getItem("visited") || null
  );
  const [user, setUser] = useState(
    { username: localStorage.getItem("username") } || null
  );
  const [newUser, setNewUser] = useState();
  const [loading, setLoading] = useState(false);
  const backendUrl = "http://localhost:8000";
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    localStorage.setItem("accessToekn", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, [accessToken, refreshToken]);

  const signup = async () => {
    const user = { ...newUser, password2: newUser.password };
    console.log(user);
    const res = await axios
      .post(`${backendUrl}/accounts/api/register/`, user)
      .then((res) => {
        console.log(res.status);
        if (Math.floor(res.status / 100) === 2) {
          setAccessToken(res.data.token.access);
          setRefreshToken(res.data.token.refresh);
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("token", res.data.token.access);
          setUser({ username: newUser.username });
        }
        return res;
      });
    console.log("signup res", res);
    return res;
  };

  const login = async (data) => {
    const res = await axios.post(`${backendUrl}/accounts/api/token/`, data);
    setAccessToken(res.data.access);
    setRefreshToken(res.data.refresh);
    return res;
  };

  return (
    <UserAuthContext.Provider
      value={{
        backendUrl,
        user,
        newUser,
        setNewUser,
        loading,
        accessToken,
        refreshToken,
        signup,
        login,
        setUser,
        visited,
        setVisited,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
