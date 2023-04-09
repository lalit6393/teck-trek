import React, { useEffect, useRef, useState} from 'react';
import { useUserAuth } from '../../context/UseUserAuth'
import axios from 'axios';
import styles from './styles.module.css'
import stage1 from '../../static_files/stage1.svg'
import stage2 from '../../static_files/stage2.svg'
import stage3 from '../../static_files/stage3.svg'
import stage4 from '../../static_files/stage4.svg'
import stage5 from '../../static_files/stage5.svg'
import stage6 from '../../static_files/stage6.svg'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [level, setLevel] = useState();
  const [score, setScore] = useState();
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState();
  const [displayMsg,setDisplayMsg] = useState();
  const [isCorrect, setIsCorrect] = useState();
  const { backendUrl, accessToken, setIsCooldown, setCoolDownTimer} = useUserAuth();
  const navigate = useNavigate();

  const successMsg = ['Bingo!!!','Amazing!',"True Warrior",'Correct!'];
  const errorMsg = ['Far from Bingo','Try Try Try','Keep Guessing','Incorrect'];
  function setMsg(success){
    const index = Math.floor(Math.random()*(successMsg.length))
    let msg;
    if(success){
       msg = successMsg[index];
    }
    if(success === false){
       msg = errorMsg[index];
    }
    setDisplayMsg(msg);
    console.log(displayMsg);
  }

  const getQuestion = () => {
    axios.get(`${backendUrl}/questions/`,{
      headers : {
         "Authorization" : `Bearer ${accessToken}`
      }
    }).then((res) => {
      if(res.data.detail.question){
        setQuestion(res.data.detail.question);
        setLevel(res.data.player_info.current_question);
        setScore(res.data.player_info.score);
        setIsCooldown(false)
      }
      else{
        if(res.data.detail.time_left == 1)
        setTimeout(()=>{
          getQuestion()
        },500)
        else{
          setIsCooldown(true)
          setCoolDownTimer(res.data.detail.time_left)
          navigate('/timer')
        }
      }
    })
  }

  useEffect(() => {
     getQuestion()
  },[])

  const submitHandler = async () => {
    if(answer){
    const res =  await axios.post(`${backendUrl}/questions/`,{answer:answer},{
      headers : {
        "Authorization" : `Bearer ${accessToken}`
      }
    })
    setAnswer('');
    const success = res.data.success;
    setIsCorrect(success);
    if(success){
      setMsg(success);
      setTimeout(()=>{
        setDisplayMsg();
        getQuestion();
      },[4000])
    }
    else{
      setMsg(success);
      setTimeout(()=>{
        setDisplayMsg();
      },[4000])
    }
  }
  }

  const achievements = [
    {
      id:1,
      stage:stage1,
      achieved:score>=20
    },
    {
      id:2,
      stage:stage2,
      achieved:score>=40
    },
    {
      id:3,
      stage:stage3,
      achieved:score>=60
    },
    {
      id:4,
      stage:stage4,
      achieved:score>=80
    },
    {
      id:5,
      stage:stage5,
      achieved:score>=100
    },
    {
      id:6,
      stage:stage6,
      achieved:score>=120
    }
  ]

  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.inputbox}>
          <div className={styles.heading}>Question</div>
          <div  className={styles.question}>{question}</div>
          <div className={styles.form}>
            <span className={styles.answergroup}>
              <input className={styles.answer} placeholder="I seek answer" type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
              <span className={styles.errormsg} style={{color:"#F78A20"}}>{displayMsg}</span>
            </span>
            <button className={styles.submit} onClick={submitHandler}>Submit</button>
          </div>
        </div>
        <div className={styles.achievements}>
          <div className={styles.progress}>
           <pre style={{margin:0}}>LEVEL: {level}  -  SCORE: {score}</pre> 
          </div>
          <hr />
          <div className={styles.heading} style={{color:"#F78A20",textAlign:"center"}}>ACHIEVEMENTS</div>
          <div className={styles.stages}>
            {
              achievements.map((achievement,i)=>{
                return (
                  <div style={{opacity: (achievement.achieved)? '1': '0.4'}} key={i} >
                    <img src={achievement.stage}/>
                    <span style={{marginTop:"7px"}}>stage {i+1}</span>
                  </div>
                )
              })
            }
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard;
