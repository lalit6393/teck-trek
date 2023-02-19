import React from "react";
import styles from "./Login.module.css";
import background from "../../static_files/BG_Main_Dark.svg";
import login from "../../static_files/login.png";
const Login = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container1}>
        <div className={styles.container2}>
          <form className={styles.form}>
            <img
              className={styles.image}
              src="src\static_files\login.png"
              alt="login"
            />
            <div className={styles.input1}>
              <input
                type="email"
                placeholder="Enter your email here"
                required
              />
            </div>
            <div className={styles.input2}>
              <input type="password" placeholder="Password goes here" />
            </div>
            <div className={styles.forgot}>
              <a href="#">Forgot Password?</a>
            </div>
            <button>Login</button>
            <div className={styles.noAccount}>
              <p>
                Don't Have an account?{" "}
                <a className={styles.register} href="#">
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
