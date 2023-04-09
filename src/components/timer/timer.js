import { useState, useEffect, useRef } from "react";
import timeLeft from "./timeleft";
import timeImg from "../../static_files/time.svg";
import styles from "./styles.module.css";
import arrow from "../../static_files/arrow2.svg";
import Cloud from "../clouds/Cloud";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UseUserAuth";
import axios from "axios";

const Timer = () => {
  const {isCooldown, cooldownTimer,setCoolDownTimer, setIsCooldown, backendUrl, accessToken} = useUserAuth();
  const cooldownTime = useRef((isCooldown) ? new Date().getTime() + cooldownTimer*1000 + 5000 : "Tue Feb 22 2023 10:37:05 GMT+0530 (India Standard Time)")
  const navigate = useNavigate();
  const [time, setTime] = useState(
    timeLeft(cooldownTime.current, isCooldown)
  );

  console.log(time.seconds);
  if(time.seconds == 0 && time.hours == 0 && time.minutes == 0){
    navigate('/dashboard')
  }

  useEffect(() => {
    axios.get(`${backendUrl}/questions/`,{
      headers : {
         "Authorization" : `Bearer ${accessToken}`
      }
    }).then((res) => {
      if(res.data.detail?.question || res.data.detail?.time_left == 1){
        setIsCooldown(false)
        navigate('/dashboard')
      }
      else{
        if(res.data.detail.time_left > 1){
          setCoolDownTimer(res.data.detail.time)
        }
      }
    })

    const interval = setInterval(() => {
      setTime( timeLeft(cooldownTime.current, isCooldown))
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <section className={styles.container}>
      <Cloud />
      <button onClick={logout} className={styles.logout}>
        <span>Logout</span>
        <img src={arrow} alt="arrow" />
      </button>
      <div className={styles.timer}>
        <img src={timeImg} alt="" />
        <div className={styles.time}>
          <p>{isCooldown? 'The next question will be available in' : 'Let the trek for the wisest begin in'}</p>
          <div className={styles.timedisplay}>
            <div className={styles.display}>
              {time.hours} <span>Hours</span>{" "}
            </div>
            :
            <div className={styles.display}>
              {time.minutes} <span>Minutes</span>{" "}
            </div>{" "}
            :
            <div className={styles.display}>
              {time.seconds} <span>Seconds</span>{" "}
            </div>
          </div>
        </div>
      </div>
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

export default Timer;
