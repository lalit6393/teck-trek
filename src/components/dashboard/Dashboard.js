import React, {useState} from 'react';
import styles from './styles.module.css'
import stage1 from '../../static_files/stage1.svg'
import stage2 from '../../static_files/stage2.svg'
import stage3 from '../../static_files/stage3.svg'
import stage4 from '../../static_files/stage4.svg'
import stage5 from '../../static_files/stage5.svg'
import stage6 from '../../static_files/stage6.svg'

const Dashboard = () => {

  const [achieved, setAchieved] = useState();

  const achievements = [
    {
      id:1,
      stage:stage1
    },
    {
      id:2,
      stage:stage2
    },
    {
      id:3,
      stage:stage3
    },
    {
      id:4,
      stage:stage4
    },
    {
      id:5,
      stage:stage5
    },
    {
      id:6,
      stage:stage6
    }
  ]

  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.inputbox}>
          <div className={styles.heading}>Question</div>
          <div className={styles.question}>what happens when it happens</div>
          <div className={styles.form}>
            <span className={styles.answergroup}>
              <input className={styles.answer} placeholder="I seek answer" type="text" />
              <span className={styles.errormsg} style={{color:"#F78A20"}}>Oops!! Try again</span>
            </span>
            <button className={styles.submit}>Submit</button>
          </div>
        </div>
        <div className={styles.achievements}>
          <div className={styles.progress}>
           <pre style={{margin:0}}>LEVEL: 5  -  SCORE: 27</pre> 
          </div>
          <hr />
          <div className={styles.heading} style={{color:"#F78A20",textAlign:"center"}}>ACHIEVEMENTS</div>
          <div className={styles.stages}>
            {
              achievements.map((achievement,i)=>{
                return (
                  <div>
                    <img src={achievement.stage} key={i} />
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
