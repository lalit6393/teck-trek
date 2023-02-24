import React, { useEffect, useState } from "react";
import navStyle from "./style.module.css";
import { Avatar, Drawer } from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import appNameImg from "../../static_files/tecktrek.svg";
import coolicon from "../../static_files/coolicon.svg";
import logoutIcon from "../../static_files/logoutIcon.svg";
import crossIcon from "../../static_files/crossIcon.svg";
import volume_up from "../../static_files/volume_up.svg";
import Prevent from "../Prevent";
import dayjs from "dayjs";
import Timer from "../timer/timer";
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const backgroundBlur = {
    background:
      "radial-gradient(80.95% 49.95% at 50% 100.57%, #08ac70 0%, rgba(14, 174, 115, 0) 100%)",
    filter: "blur(14px)",
  };

  const handleClickOpen = () => {
    setOpenDrawer(true);
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  const logout = () => {
    localStorage.removeItem("username");
    navigate('/login');
  }

  if(!dayjs().isSameOrAfter(dayjs('February 22, 2023 10:37 AM'))){
    return <Timer/>
  }else{
  return (
    <div className={navStyle.outermostDiv}>
      <div className={navStyle.navbar} id={"nav"}>
        <div className={navStyle.leftDiv}>
          <div className={navStyle.appName} onClick={() => navigate("/")}>
            <img src={appNameImg} alt={"TeckTrek"} height="23px"></img>
          </div>
        </div>
        <div className={navStyle.rightDiv}>
          <div style={{ flex: "1" }} />
          <div className={navStyle.navigation}>
            <ul>
              <li>
                <Link
                  style={
                    (location.pathname.match("/dashboard") ||
                      location.pathname.match("/")) &&
                    !location.pathname.match("/rules") &&
                    !location.pathname.match("/leaderboard")
                      ? { borderBottom: "0.6rem solid rgb(34, 139, 34)" }
                      : null
                  }
                  className={navStyle.anchor}
                  to="dashboard"
                >
                  Dashboard
                </Link>
                <div
                  style={
                    (location.pathname.match("/dashboard") ||
                      location.pathname.match("/")) &&
                    !location.pathname.match("/rules") &&
                    !location.pathname.match("/leaderboard")
                      ? backgroundBlur
                      : null
                  }
                  className={navStyle.backgroundBlur}
                >
                  Dashboard
                </div>
              </li>
              <li>
                <Link
                  style={
                    location.pathname.match("/rules")
                      ? { borderBottom: "0.6rem solid rgb(34, 139, 34)" }
                      : null
                  }
                  className={navStyle.anchor}
                  to='rules'
                >
                  Rules
                </Link>
                <div
                  style={
                    location.pathname.match("/rules") ? backgroundBlur : null
                  }
                  className={navStyle.backgroundBlur}
                >
                  Rules
                </div>
              </li>
              <li>
                <Link
                  style={
                    location.pathname.match("/leaderboard")
                      ? { borderBottom: "0.6rem solid rgb(34, 139, 34)" }
                      : null
                  }
                  className={navStyle.anchor}
                  to="leaderboard"
                >
                  Leaderboard
                </Link>
                <div
                  style={
                    location.pathname.match("/leaderboard")
                      ? backgroundBlur
                      : null
                  }
                  className={navStyle.backgroundBlur}
                >
                  Leaderboard
                </div>
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
                width: "3.8rem",
                height: "3.8rem",
                fontFamily: "Avenir",
                fontSize: "1.4rem",
              }}
              src="#"
            >
              {"White fang".slice(0, 1)}
            </Avatar>
            <div className={navStyle.icons}>
              <img
                onClick={() => navigate("/login")}
                src={logoutIcon}
                alt="logoutIcon"
              ></img>
            </div>
          </div>
        </div>
        <div className={navStyle.hamburger}>
          <img
            onClick={handleClickOpen}
            src={coolicon}
            alt="hamburger"
            width={"20px"}
          ></img>
        </div>
      </div>
      <Drawer
        className={navStyle.drawerComp}
        anchor={"top"}
        open={openDrawer}
        onClose={handleClose}
      >
        <>
          <div className={navStyle.navbar}>
            <div className={navStyle.leftDivDrawer}>
              <div className={navStyle.userProfileOnPhone}>
                <Avatar
                  sx={{
                    bgcolor: "grey",
                    cursor: "pointer",
                    width: "3.8rem",
                    height: "3.8rem",
                    fontFamily: "Avenir",
                    fontSize: "1.4rem",
                    fontWeight: "600",
                  }}
                  src="#"
                >
                  {"White fang".slice(0, 1)}
                </Avatar>
                <p>
                  {"White fang"
                    .split(" ")
                    .map(
                      (w) => w[0].toUpperCase() + w.substring(1).toLowerCase()
                    )
                    .join(" ")}
                </p>
              </div>
            </div>
            <div style={{ flex: "1" }} />
            <div className={navStyle.crossIconDrawer}>
              <img
                onClick={handleClose}
                src={crossIcon}
                alt="hamburger"
                width={"13px"}
              ></img>
            </div>
          </div>
          <div className={navStyle.drawerContent}>
            <ul>
              <li
                style={
                  (location.pathname.match("/dashboard") ||
                    location.pathname.match("/")) &&
                  !location.pathname.match("/rules") &&
                  !location.pathname.match("/leaderboard")
                    ? { background: "#08AC70" }
                    : null
                }
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </li>
              <li
                style={
                  location.pathname.match("/rules")
                    ? { background: "#08AC70" }
                    : null
                }
                onClick={() => navigate("/rules")}
              >
                Rules
              </li>
              <li
                style={
                  location.pathname.match("/leaderboard")
                    ? { background: "#08AC70" }
                    : null
                }
                onClick={() => navigate("/leaderboard")}
              >
                Leaderboard
              </li>
              <li onClick={logout}>
                <span >Logout</span>
              </li>
              <li>
                <img src={volume_up} alt="sound"></img>
              </li>
              <li>
                <span>Designed & Developed by:</span>
                <span>Nibble Computer Society</span>
              </li>
            </ul>
          </div>
        </>
      </Drawer>
      <Prevent><Outlet /></Prevent>
    </div>
  );
}};

export default Navbar;
