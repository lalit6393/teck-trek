import { useState, useEffect, useRef } from "react";
import timeLeft from "./timeleft";
import timeImg from "../../static_files/time.svg";
import styles from "./styles.module.css";
import arrow from "../../static_files/Vector.svg";
import Cloud from "../clouds/Cloud";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UseUserAuth";
import axios from "axios";
import Loader from "../Loader/Loader";
import VerifiedEmail from "../dashboard/VerifiedEmail";

const Verified = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className={styles.container}>
      <Cloud />
      <button onClick={logout} className={styles.logout}>
        <span>Logout</span>
        <img src={arrow} alt="arrow" />
      </button>
      <VerifiedEmail />

      <footer>
        <div>
          Designed & Developed by: <span>Nibble Computer Society</span>
        </div>
        <div>
          Alumni & Faculty, Visit: <span>Forum for Trekking</span>
        </div>
      </footer>
    </section>
  );
};

export default Verified;
