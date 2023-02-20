import React from "react";
import navStyle from "./style.module.css";
import { Avatar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import appNameImg from "../../static_files/tecktrek.svg";
import logoutIcon from "../../static_files/logoutIcon.svg";

const Navbar = () => {
  
  const navigate = useNavigate();

  return (
    <div className={navStyle.outermostDiv}>
      <div className={navStyle.navbar}>
        <div className={navStyle.leftDiv}>
          <div className={navStyle.navIcon}></div>
          <div className={navStyle.appName} onClick={() => navigate('/')}>
            <img src={appNameImg} alt={"TeckTrek"} height="20vh"></img>
          </div>
        </div>
        <div style={{ flex: "1" }} />
        <div className={navStyle.rightDiv}>
          <div className={navStyle.navigation}>
            <ul>
              <li>
                <a className={navStyle.anchor} href="/dashboard">Dashboard</a>
                <div className={navStyle.backgroundBlur}>Dashboard</div>
              </li>
              <li>
                <a className={navStyle.anchor} href="/rules ">Rules</a>
                <div className={navStyle.backgroundBlur}>Rules</div>
              </li>
              <li>
                <a className={navStyle.anchor} href="/leaderboard">Leaderboard</a>
                <div className={navStyle.backgroundBlur}>Leaderboard</div>
              </li>
            </ul>
          </div>
          <div style={{ flex: "1" }} />
          <div className={navStyle.userProfile}>
            <p>{"White fang".toUpperCase()}</p>
            <Avatar
              sx={{
                bgcolor: "grey",
                cursor: "pointer",
                fontWeight: "bold",
                width: "5vh",
                height: "5vh",
                fontFamily: "Avenir",
                fontSize:"2vh"
              }}
              src="#"
            >
              {"White fang".slice(0, 1)}
            </Avatar>
            <div className={navStyle.icons}>
              <img src={logoutIcon} alt="logoutIcon" width={"20px"}></img>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
