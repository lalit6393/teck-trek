import React from "react";
import styles from "./Login.module.css";
import PasswordInput from "./passwordInput";
import background from "../../static_files/BG_Main_Dark.svg";
import login from "../../static_files/login.png";
const Login = () => {
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

            <PasswordInput />

            {/* <div className={styles.input}>
              <input type="password" placeholder="Password goes here" />
            </div> */}
            <div className={styles.forgot}>
              <a href="#">Forgot Password?</a>
            </div>
            <button>Login &rarr;</button>
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
