import styles from "./styles.module.css";
import logo from "../../static_files/banner.svg";
import arrow from "../../static_files/arrow.svg";
import avatar1 from "../../static_files/avatar1.svg";
import avatar2 from "../../static_files/avatar2.svg";
import avatar3 from "../../static_files/avatar3.svg";
import avatar4 from "../../static_files/avatar4.svg";
import avatar5 from "../../static_files/avatar5.svg";
import avatar6 from "../../static_files/avatar6.svg";
import check from "../../static_files/check.svg";
import { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UseUserAuth";
import Cloud from "../clouds/Cloud";
import { Navigate, useNavigate } from "react-router-dom";
const Avatar = () => {
  const { newUser, setNewUser, setUser, signup } = useUserAuth();
  const [selectedId, setSelectedId] = useState();
  const navigate = useNavigate();
  const avatars = [
    { id: 1, img: avatar1 },
    { id: 2, img: avatar2 },
    { id: 3, img: avatar3 },
    { id: 4, img: avatar4 },
    { id: 5, img: avatar5 },
    { id: 6, img: avatar6 },
  ];


  useEffect(()=>{
    if(newUser?.email){
      console.log(newUser);
    }else{
      console.log('navigate');
      navigate('/signup')
    }
  },[])

  async function handlePayment() {
    setNewUser((prev) => {
      return { ...prev, avatar_no: selectedId };
    });
    console.log(newUser);
    signup();
  }

  return (
    <>
      <section className={styles.container}>
        <Cloud />
        <div className={styles.avatarSelection}>
          <div className={styles.logo}>
            <div></div>
            <img src={logo} alt="TechTrek" />
          </div>
          <div></div>
          <p className={styles.a_text}>Select your avatar</p>
          <div className={styles.avatarGroup}>
            {avatars.map((avatar) => {
              return (
                <img
                  src={avatar.img}
                  key={avatar.id}
                  onClick={() => {
                    setSelectedId(avatar.id);
                  }}
                  className={
                    selectedId
                      ? selectedId === avatar.id
                        ? styles.selectedAvatar
                        : styles.notSelectedAvatar
                      : null
                  }
                ></img>
              );
            })}
          </div>
          <div className={selectedId && newUser.email ? styles.paybtn : styles.paybtn +" " + styles.buttonDisabled}>
            <button
              className={selectedId && newUser.email ? null : styles.buttonDisabled}
              disabled={selectedId && newUser.email ? false : true}
              onClick={handlePayment}
            >
              Submit &rarr;
            </button>
            <div className={styles.terms}>
              <div className={styles.input}>
                <input type="checkbox" />
                <span>
                  <img src={check} alt="" />
                </span>
              </div>{" "}
              <span>
                I agree to the{" "}
                <a
                  style={{ color: "#08AC70", textDecoration: "none" }}
                  href="/"
                >
                  terms of use
                </a>{" "}
                and acknowledge the{" "}
                <a
                  style={{ color: "#08AC70", textDecoration: "none" }}
                  href="/"
                >
                  {" "}
                  privacy policy
                </a>{" "}
              </span>
            </div>
          </div>
        </div>
        <footer className={styles.foot3}>
          <div>
            Designed & Developed by: <span>Nibble Computer Society</span>
          </div>
          <div>
            Alumni & Faculty, Visit: <span>Forum for Trekking</span>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Avatar;
