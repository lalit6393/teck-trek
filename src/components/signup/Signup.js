import React, { useState } from "react";
import styles from "./Signup.module.css";
import LoginImg from "../../static_files/LoginImg.png";
import Cloud from "../clouds/Cloud";
import { useUserAuth } from "../../context/UseUserAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const {signup, setUser, newUser, setNewUser} = useUserAuth();
  const navigate = useNavigate();

  const [userRegistration, setuserRegistration] = useState({
    username: "",
    email: "",
    password: "",
    admission_no: "",
    contact_no: "",
  });
  
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setuserRegistration({ ...userRegistration, [name]: value });
  };

  const [records, setRecords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewUser(userRegistration);
    navigate("/avatar")
    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    // signup(newRecord)
    // .then((res) => {
    //   if(res.status/100 === 2){
    //     setUser({username: newRecord.username});
    //     navigate('/dashboard');
    //   }
    // })
    // .catch((err) => {
    //  console.log(err);
    // });
    setRecords([...records, newRecord]);
  };


  return (
    <div className={styles.Main}>
      <Cloud/>
      <div className={styles.Container2}>
        <form action="" onSubmit={handleSubmit} className={styles.Form}>
          <img className={styles.Image} src={LoginImg} alt="login" />
          <div className={styles.Input}>
            <input
              type="text"
              value={userRegistration.username}
              onChange={handleInput}
              autoComplete="off"
              name="username"
              placeholder="username"
              required
            />
          </div>
          <div className={styles.Input}>
            <input
              type="email"
              value={userRegistration.email}
              onChange={handleInput}
              autoComplete="off"
              name="email"
              placeholder="email"
              required
            />
          </div>
          <div className={styles.Input}>
            <input
              type="text"
              value={userRegistration.password}
              onChange={handleInput}
              name="password"
              autoComplete="off"
              placeholder="password"
              required
            />
          </div>
          <div className={styles.Input}>
            <input
              type="text"
              autoComplete="off"
              value={userRegistration.admission_no}
              onChange={handleInput}
              name="admission_no"
              placeholder="Admission no."
              required
            />
          </div>
          <div className={styles.Input}>
            <input
              type="text"
              value={userRegistration.contact_no}
              onChange={handleInput}
              autoComplete="off"
              name="contact_no"
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
