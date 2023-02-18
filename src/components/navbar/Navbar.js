import React from "react";
import navStyle from "./style.module.css";
import { Avatar } from "@mui/material";
import { Outlet } from "react-router-dom";
import appNameImg from "../../static_files/tecktrek.svg";
import toggleIcon from "../../static_files/toggle.png";
import logoutIcon from "../../static_files/logoutIcon.svg";

const Navbar = ({switchTheme}) => {

  console.log(switchTheme);

  return (
    <div className={navStyle.outermostDiv}>
      <div className={navStyle.navbar}>
        <div className={navStyle.leftDiv}>
          <div className={navStyle.navIcon}></div>
          <div className={navStyle.appName}>
            <img src={appNameImg} alt={"TeckTrek"} width="80px"></img>
          </div>
        </div>
        <div style={{ flex: "1" }} />
        <div className={navStyle.rightDiv}>
          <div className={navStyle.navigation}>
            <ul>
              <li>Dashboard</li>
              <li>Rules</li>
              <li>Leaderboard</li>
            </ul>
          </div>
          <div className={navStyle.userProfile}>
            <p>{"White fang".toUpperCase()}</p>
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
            <div className={navStyle.icons}>
              <img onClick={switchTheme} src={toggleIcon} alt="toggleIcon" width={'40px'}></img>
              <img src={logoutIcon} alt="logoutIcon" width={'20px'}></img>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
