import React, { useEffect, useRef, useState } from "react";
import navStyle from "./style.module.css";
import { Avatar, Drawer } from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import appNameImg from "../../static_files/tecktrek.svg";
import coolicon from "../../static_files/coolicon.svg";
import logoutIcon from "../../static_files/logoutIcon.svg";
import crossIcon from "../../static_files/crossIcon.svg";
import volume_up from "../../static_files/volume_up.svg";
import avatar1 from "../../static_files/avatar1.svg";
import avatar2 from "../../static_files/avatar2.svg";
import avatar3 from "../../static_files/avatar3.svg";
import avatar4 from "../../static_files/avatar4.svg";
import avatar5 from "../../static_files/avatar5.svg";
import avatar6 from "../../static_files/avatar6.svg";
import mute from "../../static_files/mute.svg";
import audioMusic from "../../audio/audio.mp3";
import { useUserAuth } from "../../context/UseUserAuth";
import Prevent from "../Prevent";
import dayjs from "dayjs";
import Timer from "../timer/timer";
import axios from "axios";
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);

const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const backgroundBlur = {
    background:
      "radial-gradient(80.95% 49.95% at 50% 100.57%, #08ac70 0%, rgba(14, 174, 115, 0) 100%)",
    filter: "blur(14px)",
  };

  const { accessToken, backendUrl, user, setUser, startDate } = useUserAuth();

  const avatars = [
    { id: 1, img: avatar1 },
    { id: 2, img: avatar2 },
    { id: 3, img: avatar3 },
    { id: 4, img: avatar4 },
    { id: 5, img: avatar5 },
    { id: 6, img: avatar6 },
  ];

  useEffect(() => {
    try {
      axios
        .get(`${backendUrl}/accounts/api`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      // navigate('/login')
    }
  }, []);

  const handleClickOpen = () => {
    setOpenDrawer(true);
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const musicPlayer = props.musicPlayer;
  const music = props.music;
  const setMusic = props.setMusic;

  if (!dayjs().isSameOrAfter(dayjs("April 13, 2023 00:00:00 AM"))) {
    return <Timer />;
  } else {
    return (
      !isLoading && (
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
                      to="rules"
                    >
                      Rules
                    </Link>
                    <div
                      style={
                        location.pathname.match("/rules")
                          ? backgroundBlur
                          : null
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
                <p>{user?.username ? user?.username : "TECH"}</p>
                <Avatar
                  sx={{
                    bgcolor: "grey",
                    fontWeight: "bold",
                    width: "3.7rem",
                    height: "3.rem",
                    fontFamily: "Avenir",
                    fontSize: "1.4rem",
                  }}
                  src={
                    user?.avatar_no
                      ? avatars[user.avatar_no - 1].img
                      : avatars[1].img
                  }
                ></Avatar>
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
                      src={
                        user?.avatar_no
                          ? avatars[user.avatar_no - 1].img
                          : avatars[1].img
                      }
                    />
                    <p>{user?.username ? user?.username : "TECH"}</p>
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
                        ? {
                            background: "#08AC70",
                            borderLeft: "8px solid #005435",
                          }
                        : null
                    }
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </li>
                  <li
                    style={
                      location.pathname.match("/rules")
                        ? {
                            background: "#08AC70",
                            borderLeft: "8px solid #005435",
                          }
                        : null
                    }
                    onClick={() => navigate("/rules")}
                  >
                    Rules
                  </li>
                  <li
                    style={
                      location.pathname.match("/leaderboard")
                        ? {
                            background: "#08AC70",
                            borderLeft: "8px solid #005435",
                          }
                        : null
                    }
                    onClick={() => navigate("/leaderboard")}
                  >
                    Leaderboard
                  </li>
                  <li onClick={logout}>
                    <span>Logout</span>
                  </li>
                  <li onClick={musicPlayer}>
                    {music ? (
                      <img src={volume_up} alt="sound" height={"24px"} />
                    ) : (
                      <img src={mute} alt="sound" height={"20px"} />
                    )}
                  </li>
                </ul>
              </div>
            </>
          </Drawer>
          <Prevent>
            <Outlet />
          </Prevent>
        </div>
      )
    );
  }
};

export default Navbar;
