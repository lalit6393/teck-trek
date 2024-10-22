import React, { useState, useEffect, useRef } from "react";
import LeaderStyle from "./style.module.css";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useUserAuth } from "../../context/UseUserAuth";
import avatar1 from "../../static_files/avatar1.svg";
import avatar2 from "../../static_files/avatar2.svg";
import avatar3 from "../../static_files/avatar3.svg";
import avatar4 from "../../static_files/avatar4.svg";
import avatar5 from "../../static_files/avatar5.svg";
import avatar6 from "../../static_files/avatar6.svg";
import stage2 from "../../static_files/stage-1-np.svg";
import stage3 from "../../static_files/stage-2-np.svg";
import stage4 from "../../static_files/stage-3-np.svg";
import stage5 from "../../static_files/stage-4-np.svg";
import stage6 from "../../static_files/stage-5-np.svg";
import stage1 from "../../static_files/stage-6-np.svg";
import Loader from "../Loader/Loader";

const LeaderBoard = () => {
  const { accessToken, backendUrl } = useUserAuth();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(6);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const slicedData = data.slice(start, end);
  const pageSize = useRef(slicedData.length);

  const avatars = [
    { id: 1, img: avatar1 },
    { id: 2, img: avatar2 },
    { id: 3, img: avatar3 },
    { id: 4, img: avatar4 },
    { id: 5, img: avatar5 },
    { id: 6, img: avatar6 },
  ];

  const achievements = [
    {
      id: 0,
      stage: stage1,
    },
    {
      id: 1,
      stage: stage2,
    },
    {
      id: 2,
      stage: stage3,
    },
    {
      id: 3,
      stage: stage4,
    },
    {
      id: 4,
      stage: stage5,
    },
    {
      id: 5,
      stage: stage6,
    },
  ];

  // const [limit, setLimit] = useState(0);

  useEffect(() => {
    var screenHeight = window.innerHeight;
    const rowElement = document.querySelector("#row");
    const rowHeight = rowElement?.offsetHeight || 64;
    const calculatedLimit = Math.floor((screenHeight - 300) / rowHeight);
    setItemPerPage(calculatedLimit);

    window.addEventListener("resize", (event) => {
      var screenHeight = window.innerHeight;
      // console.log("Dhruv K" , event.currentTarget.outerHeight);
      screenHeight = event.currentTarget.outerHeight;
      // console.log("lalit V" , screenHeight);
      const rowElement = document.querySelector("#row");
      const rowHeight = rowElement?.offsetHeight || 64;
      const calculatedLimit = Math.floor((screenHeight - 300) / rowHeight);
      setItemPerPage(calculatedLimit);
      // console.log(screenHeight);
    });
    // const screenHeight = window.innerHeight;
    const getLeaderboard = async () => {
      const res = await axios.get(`${backendUrl}/questions/leaderboard`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (Math.floor(res.status / 100) == 2) {
        setIsLoading(false);
      }
      const sortedArr = res.data.sort((a, b) => b.score - a.score);
      setIsLoading(res.data ? false : true);
      setData(sortedArr);
    };
    getLeaderboard();
  }, []);

  return (
    !isLoading && (
      <div className={LeaderStyle.outermostDiv}>
        <div className={LeaderStyle.innermostDiv}>
          <div className={LeaderStyle.mainHeading}>LeaderBoard</div>

          <div className={LeaderStyle.LeaderBoard}>
            <div className={LeaderStyle.headerRowMain}>
              <div className={(LeaderStyle.headerColumn, LeaderStyle.rank)}>
                Rank
              </div>
              <div
                className={(LeaderStyle.headerColumn, LeaderStyle.nameMain)}
                style={{ justifyContent: "center", paddingLeft: "0rem" }}
              >
                name
              </div>
              <div className={(LeaderStyle.headerColumn, LeaderStyle.score)}>
                score
              </div>
              <div className={(LeaderStyle.headerColumn, LeaderStyle.badge)}>
                badge
              </div>
            </div>
            {slicedData.map((entry, index) => {
              return (
                <div
                  className={LeaderStyle.headerRow}
                  id={"row"}
                  key={index}
                  style={{
                    background: index % 2 === 0 ? "" : "rgba(15, 48, 53, 0.4)",
                  }}
                >
                  <div className={LeaderStyle.rank}>
                    {index + 1 + (page - 1) * itemsPerPage}
                  </div>
                  <div className={LeaderStyle.name}>
                    <Avatar
                      sx={{
                        bgcolor: "#C4C4C4",
                        cursor: "pointer",
                        fontWeight: "bold",
                        width: "35px",
                        height: "35px",
                        fontFamily: "Avenir",
                      }}
                      src="#"
                    >
                      <img
                        style={{ width: "100%" }}
                        src={avatars[entry.avatar_no - 1].img}
                      ></img>
                    </Avatar>

                    <span>{entry.player_name}</span>
                  </div>
                  <div className={LeaderStyle.score}>{entry.score}</div>
                  <div className={LeaderStyle.badge}>
                    {entry.best_badge && (
                      <img
                        style={{ height: "85%" }}
                        src={achievements[entry.best_badge].stage}
                      ></img>
                    )}
                  </div>
                </div>
              );
            })}
            <div className={LeaderStyle.buttonContainer}>
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={LeaderStyle.prev}
                style={{
                  opacity: page === 1 ? "0" : "1",
                }}
              >
                Previous
              </button>
              <button
                disabled={end >= data.length}
                onClick={() => setPage(page + 1)}
                className={LeaderStyle.next}
                style={{
                  opacity: end >= data.length ? "0" : "1",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LeaderBoard;
