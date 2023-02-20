import { Route, Routes } from "react-router-dom";
import "./App.css";
import Avatar from "./components/avatar/avatar";
import Dashboard from "./components/dashboard/Dashboard";
import LeaderBoard from "./components/leader_board/LeaderBoard";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Page_not_found from "./components/page_not_found/Page_not_found";
import Rules_page from "./components/rules_page/Rules_page";
import Signup from "./components/signup/Signup";
import { UserAuthProvider } from "./context/UseUserAuth";

function App() {
  return (
    <div className="App">
      <UserAuthProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Navbar/>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leaderboard" element={<LeaderBoard/>} />
            <Route path="rules" element={<Rules_page/>} />
          </Route>
          <Route path="avatar" element={<Avatar />} />
          <Route path="*" element={<Page_not_found />} />
        </Routes>
      </UserAuthProvider>
    </div>
  );
}

export default App;
