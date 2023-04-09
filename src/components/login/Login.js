import React, { useState } from "react";
import styles from "./Login.module.css";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import LoginImg from "../../static_files/LoginImg.png";
import Cloud from "../clouds/Cloud";
import { useUserAuth } from "../../context/UseUserAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  ////////////id password
  const { login, setUser } = useUserAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [allEntry, setallEntry] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    const newEntry = { username: username.trim(), password: password.trim() };
    setallEntry([...allEntry, newEntry]);
    if (username && password) {
      console.log(newEntry);
      login(newEntry)
        .then((res) => {
          if (res.status / 100 === 2) {
            setUser({ username: username });
            navigate("/dashboard");
          }
        })
        .catch((err) => console.log("login page error", err));
    }
  };
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.main}>
      <Cloud />
      <div className={styles.container1}>
        <div className={styles.container2}>
          <form action="" onSubmit={submitForm} className={styles.form}>
            <img src={LoginImg} width={"300px"} alt="login" />
            <div className={styles.input}>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username here"
                required
              />
            </div>

            <div className={styles.Pass + " " + styles.input}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Password goes here"
                type={visible ? "text" : "password"}
                className={styles.passInput}
              />
              <div className={styles.iconDiv}>
                <span
                  className={styles.eye}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              </div>
            </div>

            {/* <div className={styles.input}>
              <input type="password" placeholder="Password goes here" />
            </div> */}
            <div className={styles.forgot}>
              <a className={styles.a2} href="/login">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className={styles.logBtn}>
              Login &rarr;
            </button>
            <div className={styles.noAccount}>
              <p className={styles.para}>
                Don't Have an account?{" "}
                <a className={styles.register + " " + styles.a2} href="/Signup">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <div>
          Designed & Developed by: <span>Nibble Computer Society</span>
        </div>
        <div>
          Alumni & Faculty, Visit: <span>Forum for Trekking</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
