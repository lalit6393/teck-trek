import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const startDate = 'Thu Apr 9 2023 00:00:00 GMT+0530 (India Standard Time)'
  const navigate = useNavigate();
  const [visited, setVisited] = useState(
    localStorage.getItem("visited") || null
  );
  const [user, setUser] = useState(
    { username: localStorage.getItem("username") } || null
  );
  const [newUser, setNewUser] = useState();
  const [loading, setLoading] = useState(false);
  const backendUrl = "https://techtrek-api.hackncs.in";
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null
  );
  const [isCooldown, setIsCooldown]=useState(false)
  const [cooldownTimer, setCoolDownTimer] = useState();
  const [alert, setAlert] = useState({
    isOpen: false,
    msg: "",
    status: "",
  });

  const alertUser = (msg, status) => {
    setAlert((prev) => {
      return { ...prev, isOpen: true, msg, status };
    });
    setTimeout(() => {
      setAlert((prev) => {
        return { ...prev, isOpen: false };
      });
    }, 4000);
  };

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }, [accessToken, refreshToken]);

  const signup = async (id) => {
    const user = { ...newUser, password2: newUser.password , avatar_no:id};
    console.log(user);
    try {
      const response = await axios
        .post(`${backendUrl}/accounts/api/register/`, user)
        .then((res) => {
          console.log(res);
          if (Math.floor(res.status / 100) === 2) {
            console.log("navigate");
            setAccessToken(res.data.token.access);
            setRefreshToken(res.data.token.refresh);
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("accessToken", res.data.token.access);
            localStorage.setItem("refreshToken", res.data.token.refresh);
            setUser({ username: newUser.username });
            alertUser("Succesfully created account", 200);
            navigate("/dashboard");
          }
          return res;
        });
    } catch (e) {
      alertUser(e.response.data.contact_no && e.response.data.contact_no[0] || e.response.data.email && e.response.data.email[0] || e.response.data.username && e.response.data.username[0] || e.message);
    }
  };

  const login = async (data) => {
    try{
    const res = await axios.post(`${backendUrl}/accounts/api/token/`, data);
    if(Math.floor(res.status/100 ) == 2){
      setAccessToken(res.data.access);
      setRefreshToken(res.data.refresh);
      alertUser("Login Succesful",200);
      return res;
    }
  }catch(e){
    console.log(e);
    alertUser(e.response.data.detail || e.message);
  }
  };

  return (
    <UserAuthContext.Provider
      value={{
        setAlert,
        alert,
        alertUser,
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
        setIsCooldown,
        isCooldown,
        cooldownTimer,
        setCoolDownTimer,
        startDate
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
