import React, { useState } from "react";
import styles from "./Signup.module.css";
import background from "../../static_files/BG_Main_Dark.svg";
import signupImg from "../../static_files/signup.svg";
import Cloud from "../clouds/Cloud";
import { useUserAuth } from "../../context/UseUserAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const {signup, setUser} = useUserAuth();
  const navigate = useNavigate();

  const [userRegistration, setuserRegistration] = useState({
    Username: "",
    Email: "",
    Password: "",
    Admission: "",
    Phone: "",
  });
  
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setuserRegistration({ ...userRegistration, [name]: value });
  };

  const [records, setRecords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    console.log(newRecord);
    signup(newRecord)
    .then((res) => {
      console.log(res);
      localStorage.setItem('username', 'Lalit');
      setUser({username: 'Lalit'});
      navigate('/dashboard');
    })
    .catch((err) => {
     console.log(err);
    });
    setRecords([...records, newRecord]);
  };


  return (
    <div className={styles.Main}>
      <Cloud/>
      <div className={styles.Container2}>
        <form action="" onSubmit={handleSubmit} className={styles.Form}>
          <img className={styles.Image} src={signupImg} alt="login" />
          <div className={styles.Input}>
            <input
              type="text"
              value={userRegistration.Username}
              onChange={handleInput}
              autoComplete="off"
              name="Username"
              placeholder="Username"
              required
            />
          </div>
          <div className={styles.Input}>
            <input
              type="email"
              value={userRegistration.Email}
              onChange={handleInput}
              autoComplete="off"
              name="Email"
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.Input}>
            <input
              type="text"
              value={userRegistration.Password}
              onChange={handleInput}
              name="Password"
              autoComplete="off"
              placeholder="Password"
              required
            />
          </div>
          <div className={styles.Input}>
            <input
              type="text"
              autoComplete="off"
              value={userRegistration.Admission}
              onChange={handleInput}
              name="Admission"
              placeholder="Admission no."
              required
            />
          </div>
          <div className={styles.Input}>
            <input
              type="text"
              value={userRegistration.Phone}
              onChange={handleInput}
              autoComplete="off"
              name="Phone"
              placeholder="Phone"
              required
            />
          </div>

          <button className={styles.buttonSubmit} type="submit">
            Continue &rarr;
          </button>
          <div className={styles.HaveAccount}>
            <p className={styles.paragraph}>
              Already have an account?{" "}
              <a className={styles.login} href="/login">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
      <footer>
            <div>Designed & Developed by: <span>Nibble Computer Society</span></div>
            <div>Alumni & Faculty, Visit: <span>Forum for Trekking</span></div>
     </footer>
    </div>
  );
};

export default Signup;
