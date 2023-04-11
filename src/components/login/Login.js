import React, { useState } from "react";
import styles from "./Login.module.css";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import LoginImg from "../../static_files/LoginImg.png";
import Cloud from "../clouds/Cloud";
import { useUserAuth } from "../../context/UseUserAuth";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Oval } from "react-loader-spinner";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Please fill this field").min(4),

  password: Yup.string().required("Please fill this field").min(10),
});

const Login = () => {
  ////////////id password
  const { login, setUser } = useUserAuth();
  const navigate = useNavigate();
  const [allEntry, setallEntry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = (data) => {
    const newEntry = { ...data };
    setallEntry([...allEntry, newEntry]);
    if (data.username && data.password) {
      setIsLoading(true);
      // console.log(newEntry);
      login(newEntry)
        .then((res) => {
          setIsLoading(false);
          if (res.status / 100 === 2) {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          // console.log("login page error", err);
        });
    }
  };
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.main}>
      <Cloud />
      <div className={styles.container1}>
        <div className={styles.container2}>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              submitForm(values);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={styles.form} style={{ zIndex: "100" }}>
                <img src={LoginImg} width={"300px"} alt="login" />
                <div className={styles.input}>
                  <Field
                    autocomplete="off"
                    className={
                      errors.username && touched.username && styles.errorInput
                    }
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                  {errors.username && touched.username ? (
                    <div className={styles.errorText}>{errors.username}</div>
                  ) : null}
                </div>

                <div style={{ position: "relative" }}>
                  <div className={styles.Pass + " " + styles.input}>
                    <Field
                      autocomplete="off"
                      type={visible ? "text" : "password"}
                      className={
                        errors.password &&
                        touched.password &&
                        styles.errorInput &&
                        styles.passInput
                      }
                      name="password"
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      <div className={styles.errorText}>{errors.password}</div>
                    ) : null}
                    <div
                      className={styles.iconDiv}
                      style={{
                        top:
                          errors.password && touched.password ? "40%" : "50%",
                      }}
                    >
                      <span
                        className={styles.eye}
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={
                    errors.username || errors.password
                      ? styles.buttonDisabled
                      : styles.buttonSubmit
                  }
                  style={{
                    marginTop: "20px",
                    paddingTop: "11px",
                    paddingBottom: "11px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                  disabled={errors.username || errors.password ? true : false}
                >
                  {!isLoading ? (
                    "Login"
                  ) : (
                    <Oval
                      height="30"
                      width="30"
                      radius="9"
                      color="white"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      }}
                      wrapperClass
                    />
                  )}
                </button>
                <div className={styles.noAccount}>
                  <p className={styles.para}>
                    Don't Have an account?{" "}
                    <a
                      className={styles.register + " " + styles.a2}
                      href="/Signup"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <footer className={styles.foote}>
        <div>
          Designed & Developed by: <span>Nibble Computer Society</span>
        </div>
        <div>
          Alumni & Faculty, Visit:{" "}
          <span>
            <a
              href="https://www.instagram.com/hackncs/"
              style={{ textDecoration: "none", color: "white" }}
            >
              Forum for Trekking
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
