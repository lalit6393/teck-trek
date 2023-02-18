import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import LeaderBoard from "./components/leader_board/LeaderBoard";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Page_not_found from "./components/page_not_found/Page_not_found";
import Signup from "./components/signup/Signup";
import { UserAuthProvider } from "./context/UseUserAuth";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    console.log(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <UserAuthProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Navbar switchTheme = {switchTheme}/>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leaderboard" element={<LeaderBoard/>} />
          </Route>
          <Route path="*" element={<Page_not_found />} />
        </Routes>
      </UserAuthProvider>
    </div>
  );
}

export default App;
