import React, { useState } from "react";
import LeaderStyle from "./style.module.css";
import { Avatar } from "@mui/material";

const data = [
  { rank: 1, name: "White fang", score: "27", badge: "dhruv" },
  { rank: 2, name: "White fang", score: "27", badge: "dhruv" },
  { rank: 3, name: "White fang", score: "27", badge: "dhruv" },
  { rank: 4, name: "White fang", score: "27", badge: "dhruv" },
  { rank: 5, name: "White fang", score: "27", badge: "dhruv" },
  { rank: 6, name: "White fang", score: "29", badge: "dhruv" },
  { rank: 7, name: "White fang", score: "27", badge: "dhruv" },
  { rank: 8, name: "White fang", score: "30", badge: "dhruv" }
];

console.log(data);

const LeaderBoard = () => {
  const [page,setPage] = useState(1);
  const itemsPerPage = 6;
  const start = (page - 1) * itemsPerPage;
  const end = page*itemsPerPage;
  const slicedData = data.slice(start,end); 
  return (
    <div className={LeaderStyle.outermostDiv}>
      <div className={LeaderStyle.innermostDiv}>
        <div className={LeaderStyle.mainHeading}>LeaderBoard</div>

        <div className={LeaderStyle.LeaderBoard}>
          <div className={LeaderStyle.headerRowMain}>
            <div className={(LeaderStyle.headerColumn, LeaderStyle.rank)}>
              Rank
            </div>
            <div className={(LeaderStyle.headerColumn, LeaderStyle.name)}>
              name
            </div>
            <div className={(LeaderStyle.headerColumn, LeaderStyle.score)}>
              score
            </div>
            <div className={(LeaderStyle.headerColumn, LeaderStyle.badge)}>
              badge
            </div>
          </div>
          {
            slicedData.map((entry,index) => {
              return (
                <div className={LeaderStyle.headerRow} key={index} style={{background: index%2 === 0 ? '' : "rgba(15, 48, 53, 0.4)"}}>
                <div className={LeaderStyle.rank}>{entry.rank}</div>
            <div className={LeaderStyle.name}><Avatar
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
              {"Dhruv".slice(0, 1)}
            </Avatar>
            
            <span>{entry.name}</span>
            </div>
            <div className={LeaderStyle.score}>{entry.score}</div>
            <div className={LeaderStyle.badge}>
            <Avatar
              sx={{
                bgcolor: "grey",
                cursor: "pointer",
                fontWeight: "bold",
                width: "35px",
                height: "35px",
                fontFamily: "Avenir",
              }}
              src="#"
            >
              {"White fang".slice(0, 1)}
            </Avatar>
            </div>
                </div>
              )
            })
          }
          <div className={LeaderStyle.buttonContainer}>
          <button disabled={page===1} onClick={() => setPage(page-1)} className={LeaderStyle.prev}>Previous</button>
          <button disabled={end>=data.length} onClick={() => setPage(page+1)} className={LeaderStyle.next}>Next</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
