import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../../context/UseUserAuth";
import axios from "axios";
import styles from "./styles.module.css";
import stage2 from "../../static_files/stage1.svg";
import stage3 from "../../static_files/stage2.svg";
import stage4 from "../../static_files/stage3.svg";
import stage5 from "../../static_files/stage4.svg";
import stage6 from "../../static_files/stage5.svg";
import stage1 from "../../static_files/stage6.svg";
import stage2np from "../../static_files/stage-1-np.svg";
import stage3np from "../../static_files/stage-2-np.svg";
import stage4np from "../../static_files/stage-3-np.svg";
import stage5np from "../../static_files/stage-4-np.svg";
import stage6np from "../../static_files/stage-5-np.svg";
import stage1np from "../../static_files/stage-6-np.svg";
import { useNavigate } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import Loader from "../Loader/Loader";
import dayjs from "dayjs";
import Gameover from "./Gameover";
import { Oval } from "react-loader-spinner";
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);

const Dashboard = () => {
  const [level, setLevel] = useState();
  const [score, setScore] = useState();
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState();
  const [badge, setBadge] = useState();
  const [isLeader, setIsLeader] = useState(false);
  const [displayMsg, setDisplayMsg] = useState();
  const [isCorrect, setIsCorrect] = useState();
  const { backendUrl, accessToken, setIsCooldown, setCoolDownTimer } =
    useUserAuth();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  // console.log(question);
  const successMsg = [
    "Bingo!!!",
    "Amazing!",
    "True Warrior",
    "Correct!",
    "Bravo, correct!",
    "You nailed it!",
    "You got it!",
    "Spot on, Correct!",
  ];
  const errorMsg = [
    "Far from Bingo",
    "Try Try Try",
    "Keep Guessing",
    "Incorrect",
    "Almost there, try again",
    "Wrong answer",
    "Keep Fighting, Warrior",
    "Not quite right",
  ];
  function setMsg(success) {
    const index = Math.floor(Math.random() * successMsg.length);
    let msg;
    if (success) {
      msg = successMsg[index];
    }
    if (success === false) {
      msg = errorMsg[index];
    }
    setDisplayMsg(msg);
  }

  const getQuestion = () => {
    axios
      .get(`${backendUrl}/questions/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setVerified(true);
        setIsLoading(false);
        if (res.data.detail.question) {
          console.log(res);
          setQuestion(res.data.detail.question);
          setLevel(res.data.player_info.current_question);
          setScore(res.data.player_info.score);
          setIsCooldown(false);
          res.data.badges.map((badge) => {
            if (badge.badge == 0) {
              setIsLeader(true);
            }
          });
          if (res.data.badges[res.data.badges.length - 1].badge == 0) {
            console.log(res.data.badges[res.data.badges.length - 2].badge);
            setBadge(res.data.badges[res.data.badges.length - 2].badge);
          } else {
            console.log(res.data.badges[res.data.badges.length - 1].badge);
            setBadge(res.data.badges[res.data.badges.length - 1].badge);
          }
        } else {
          if (res.data.detail.time_left == 1)
            setTimeout(() => {
              getQuestion();
            }, 500);
          else {
            setIsCooldown(true);
            setCoolDownTimer(res.data.detail.time_left);
            navigate("/timer");
          }
        }
      })
      .catch((e) => {
        if (e.response?.status == 401) {
          setIsLoading(false);
          setVerified(false);
        }
      });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const submitHandler = async () => {
    if (answer) {
      setSubmitting(true);
      const res = await axios.post(
        `${backendUrl}/questions/`,
        { answer: answer },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAnswer("");
      const success = res.data.success;
      setSubmitting(false);
      setIsCorrect(success);
      if (success) {
        setMsg(success);
        setTimeout(() => {
          setDisplayMsg();
          getQuestion();
        }, [500]);
      } else {
        setMsg(success);
        setTimeout(() => {
          setDisplayMsg();
        }, [500]);
      }
    }
  };

  const achievements = [
    {
      id: 0,
      stage: stage1,
      stagenp: stage1np,
    },
    {
      id: 1,
      stage: stage2,
      stagenp: stage2np,
    },
    {
      id: 2,
      stage: stage3,
      stagenp: stage3np,
    },
    {
      id: 3,
      stage: stage4,
      stagenp: stage4np,
    },
    {
      id: 4,
      stage: stage5,
      stagenp: stage5np,
    },
    {
      id: 5,
      stage: stage6,
      stagenp: stage6np,
    },
  ];

  return dayjs().isSameOrAfter(dayjs("April 14, 2023 04:00:00 PM")) ? (
    <Gameover />
  ) : isLoading ? (
    <Loader />
  ) : !verified ? (
    <VerifyEmail />
  ) : (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.inputbox}>
          <div className={styles.heading}>Question</div>
          <div className={styles.question}>{question}</div>
          <div className={styles.form}>
            <span className={styles.answergroup}>
              <input
                className={styles.answer}
                placeholder="I seek answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span className={styles.errormsg} style={{ color: "#F78A20" }}>
                {displayMsg}
              </span>
            </span>
            <button
              className={answer ? styles.submit : styles.buttonDisabled}
              onClick={submitHandler}
              style={{ position: "relative" }}
            >
              {!submitting ? (
                "Submit"
              ) : (
                <Oval
                  height="30"
                  width="30"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                  wrapperClass
                />
              )}
            </button>
          </div>
        </div>
        <div className={styles.achievements}>
          <div className={styles.progress}>
            <pre style={{ margin: 0 }}>
              LEVEL: {level} &nbsp;&nbsp; - &nbsp;&nbsp; SCORE: {score}
            </pre>
          </div>
          <hr />
          <div
            className={styles.heading}
            style={{ color: "#F78A20", textAlign: "center", fontWeight: "800" }}
          >
            ACHIEVEMENTS
          </div>
          <div className={styles.stages}>
            {achievements.map((achievement, i) => {
              return (
                <div
                  style={{
                    opacity:
                      i === 0
                        ? isLeader
                          ? "1"
                          : "0.4"
                        : achievement.id <= badge
                        ? "1"
                        : "0.4",
                  }}
                  key={i}
                >
                  <img
                    src={
                      i === 0
                        ? isLeader
                          ? achievement.stage
                          : achievement.stagenp
                        : achievement.id <= badge
                        ? achievement.stage
                        : achievement.stagenp
                    }
                    className={
                      i === 0
                        ? isLeader
                          ? ""
                          : styles.notAchieved
                        : achievement.id <= badge
                        ? ""
                        : styles.notAchieved
                    }
                  />
                  <span style={{ marginTop: "7px" }}>
                    {i === 0 ? "Leader" : `Stage ${i}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
