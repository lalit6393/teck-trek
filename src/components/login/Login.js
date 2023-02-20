import React from "react";
import styles from "./Login.module.css";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { useState } from "react";

import login from "../../static_files/login.png";
const Login = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.container1}>
        <div className={styles.container2}>
          <form className={styles.form}>
            <img className={styles.image} src={login} alt="login" />
            <div className={styles.input}>
              <input
                type="email"
                placeholder="Enter your email here"
                required
              />
            </div>

            <div className={styles.Pass + " " + styles.input}>
              <input
                value={password}
                id="password"
                placeholder="Password goes here"
                type={visible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
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
              <a href="#">Forgot Password?</a>
            </div>
            <button className={styles.logBtn}>Login &rarr;</button>
            <div className={styles.noAccount}>
              <p>
                Don't Have an account?{" "}
                <a className={styles.register} href="/Signup">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
