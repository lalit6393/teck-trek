import { Route, Routes } from "react-router-dom";
import "./App.css";
import Avatar from "./components/avatar/avatar";
import Dashboard from "./components/dashboard/Dashboard";
import LeaderBoard from "./components/leader_board/LeaderBoard";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import PageNotFound from "./components/page_not_found/PageNotFound";
import Prevent from "./components/Prevent";
import RulesPage from "./components/rules_page/RulePage";
import Signup from "./components/signup/Signup";
import StoryPage from "./components/story_Page/StoryPage";
import Timer from "./components/timer/timer";
import { UserAuthProvider } from "./context/UseUserAuth";
import AlertMsg from "./components/alert/alert";

function App() {
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
                <Navbar />
              </Prevent>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="rules" element={<RulesPage />} />
          </Route>
          <Route path="avatar" element={<Avatar />} />
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
      </UserAuthProvider>
    </div>
  );
}

export default App;
