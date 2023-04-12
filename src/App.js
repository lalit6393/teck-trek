import { Route, Routes } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import "./App.css";
import Avatar from "./components/avatar/avatar";
import Dashboard from "./components/dashboard/Dashboard";
import LeaderBoard from "./components/leader_board/LeaderBoard";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import PageNotFound from "./components/page_not_found/PageNotFound";
import Prevent from "./components/Prevent";
import RulesPage from "./components/rules_page/RulePage";
import audioMusic from "./audio/audio.mp3";
import Signup from "./components/signup/Signup";
import StoryPage from "./components/story_Page/StoryPage";
import Timer from "./components/timer/timer";
import { UserAuthProvider } from "./context/UseUserAuth";
import AlertMsg from "./components/alert/alert";
import Verified from "./components/timer/verify";

function App() {
  const audioRef = useRef(null);
  const [music, setMusic] = useState(false);

  const musicPlayer = () => {
    var audio = audioRef.current;
    if (music) {
      setMusic(false);
      audio.pause();
    } else {
      setMusic(true);
      audio.play();
    }
  };

  function musicPlay() {
    var audio = audioRef.current;
    audio.play();
    setMusic(true);
    document.removeEventListener("click", musicPlay);
  }

  useEffect(() => {
    document.addEventListener("click", musicPlay);
  }, []);
  return (
    <div className="App">
      <UserAuthProvider>
        <AlertMsg />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="story" element={<StoryPage />} />
          <Route
            path="/"
            element={
              <Prevent>
                <Navbar
                  musicPlayer={musicPlayer}
                  music={music}
                  setMusic={setMusic}
                />
              </Prevent>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="rules" element={<RulesPage />} />
          </Route>
          <Route path="avatar" element={<Avatar />} />
          <Route path="verified" element={<Verified />} />
          <Route
            path="timer"
            element={
              <Prevent>
                <Timer />
              </Prevent>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <audio src={audioMusic} ref={audioRef} autoPlay loop></audio>
      </UserAuthProvider>
    </div>
  );
}

export default App;
