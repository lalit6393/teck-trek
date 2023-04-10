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

const Timer = () => {
  const {isCooldown, cooldownTimer,setCoolDownTimer, setIsCooldown, backendUrl, accessToken, startDate} = useUserAuth();
  const cooldownTime = useRef((isCooldown) ? new Date().getTime() + cooldownTimer*1000 + 5000 : startDate)
  const navigate = useNavigate();
  const [time, setTime] = useState(
    timeLeft(cooldownTime.current, isCooldown)
  );
  const isLoading = useRef(true)

  if(time.seconds == 0 && time.hours == 0 && time.minutes == 0 && !isLoading.current){
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
        isLoading.current=false
        navigate('/dashboard')
      }
      else{
        if(res.data.detail.time_left > 1){
          setIsCooldown(true);
          setCoolDownTimer(res.data.detail.time_left)
          cooldownTime.current = new Date().getTime() + res.data.detail.time_left*1000 + 5000
          isLoading.current = false
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
      {
        isLoading.current ? (<Loader />) : (
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
        )
      }
      
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
