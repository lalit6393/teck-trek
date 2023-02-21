import {useState} from 'react'
import timeLeft from './timeleft';
import timeImg from '../../static_files/time.svg'
import styles from './styles.module.css'
import arrow from '../../static_files/arrow2.svg'

const Timer = () => {
    const [time, setTime] = useState(timeLeft('Tue Feb 22 2023 10:37:05 GMT+0530 (India Standard Time)'));
    setInterval(()=>{
        setTime(timeLeft('Tue Feb 22 2023 10:37:05 GMT+0530 (India Standard Time)'));
    },(1000))
    return ( 
    <section className={styles.container}>
        <button className={styles.logout}>
            <span>Logout</span>
            <img src={arrow} alt="" srcset="" />
        </button>
        <div className={styles.timer}>
            <img src={timeImg} alt="" />
            <div className={styles.time}>
                <p>Let the trek for the wisest begin in</p>
                <div className={styles.timedisplay}>
                    <div className={styles.display}>{time.hours} <span>Hours</span> </div> 
                    :
                    <div className={styles.display}>{time.minutes} <span>Minutes</span> </div> :
                    <div className={styles.display}>{time.seconds} <span>Seconds</span> </div>
                </div>
            </div>
        </div>
        <footer>
            <div>Designed & Developed by: <span>Nibble Computer Society</span></div>
            <div>Alumni & Faculty, Visit: <span>Forum for Trekking</span></div>
          </footer>
    </section>
     );
}
 
export default Timer;