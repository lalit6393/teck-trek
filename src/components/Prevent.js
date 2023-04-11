import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UseUserAuth";

const Prevent = ({ children }) => {
  var navigate = useNavigate();
  var { user, loading, visited, accessToken, refreshToken } = useUserAuth();

  useEffect(() => {
    if (visited) {
      if (!accessToken && !loading) {
        navigate("/login");
      }
    } else {
      navigate("/story");
    }
  }, [accessToken, loading]);

  return (
    <>
      {accessToken ? (
        <>{children}</>
      ) : (
        <div
          style={{
            fontSize: "1.8rem",
            color: "white",
            background: "#0A0A12",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>Not Logged in!</p>
          <p>Redirecting to Login Page...</p>
        </div>
      )}
    </>
  );
};

export default Prevent;
