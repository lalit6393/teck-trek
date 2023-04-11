import React, { useState } from "react";
import styles from "./Signup.module.css";
import background from "../../static_files/BG_Main_Dark.svg";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import signupImg from "../../static_files/signup.svg";
import Cloud from "../clouds/Cloud";
import info from "../../static_files/Info.svg"
import { useUserAuth } from "../../context/UseUserAuth";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const signupSchema = Yup.object().shape({
  username: Yup.string().required("Please fill this field").min(4),
  email: Yup.string()
    .email("Enter valid email")
    .required("Please fill this field"),
  password: Yup.string().required("Please fill this field").min(10),
  admission_no: Yup.string().required("Please fill this field"),
  contact_no: Yup.string()
    .matches(phoneRegex, "Invalid phone no.")
    .test(
      "len",
      "Phone Number needs to be excatly 10 digits",
      (val) => val.toString().length === 10
    )
    .required("Please fill this field"),
});

const Signup = () => {
  const { signup, setUser, newUser, setNewUser } = useUserAuth();
  const navigate = useNavigate();

  const [userRegistration, setuserRegistration] = useState({
    username: "",
    email: "",
    password: "",
    admission_no: "",
    contact_no: "",
  });

  const [records, setRecords] = useState([]);

  const handleSubmit = (data) => {
    if(!data.tezos_wallet_id){
      data.tezos_wallet_id = "none"
    }
    setNewUser(data);
    navigate("/avatar");
    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };
    setRecords([...records, newRecord]);
  };
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.Main}>
      <Cloud />
      <div className={styles.Container2}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            contact_no: "",
            admission_no: "",
            tezos_wallet_id: ""
          }}
          validationSchema={signupSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleSubmit(values);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.Form}>
              <img className={styles.Image} src={signupImg} alt="login" />
              <div className={styles.Input}>
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
              <div className={styles.Input}>
                <Field
                  autocomplete="off"
                  className={errors.email && touched.email && styles.errorInput}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <div className={styles.errorText}>{errors.email}</div>
                ) : null}
              </div>
                {/* <div className={styles.Pass + " " + styles.input}> */}
              <div className={styles.Input}>
                <span className={styles.inputWithBtn}>
                <Field
                  autocomplete="off"
                  className={
                    errors.password && touched.password && styles.errorInput &&styles.passInput
                  }
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                 <span
                      className={styles.inputBtn}
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeOutlined style={{fontSize:"22px"}}/> : <EyeInvisibleOutlined style={{fontSize:"22px"}}/>}
                    </span>
                </span>
                {errors.password && touched.password ? (
                  <div className={styles.errorText}>{errors.password}</div>
                ) : null}
                  </div>

              <div className={styles.Input}>
                <Field
                  autocomplete="off"
                  className={
                    errors.admission_no &&
                    touched.admission_no &&
                    styles.errorInput
                  }
                  type="text"
                  name="admission_no"
                  placeholder="Admission no"
                />
                {errors.admission_no && touched.admission_no ? (
                  <div className={styles.errorText}>{errors.admission_no}</div>
                ) : null}
              </div>
              <div className={styles.Input}>
                <Field
                  autocomplete="off"
                  className={
                    errors.contact_no && touched.contact_no && styles.errorInput
                  }
                  type="text"
                  name="contact_no"
                  placeholder="Phone no"
                />
                {errors.contact_no && touched.contact_no ? (
                  <div className={styles.errorText}>{errors.contact_no}</div>
                ) : null}
              </div>
              <div className={styles.Input}>
                <span className={styles.inputWithBtn}>
                  <Field
                    autocomplete="off"
                    className={
                      errors.contact_no && touched.contact_no && styles.errorInput
                    }
                    type="text"
                    name="tezos_wallet_id"
                    placeholder="Tezos wallet Id (optional)"
                  />
                  <img src={info} className={styles.inputBtn}  />
                </span>
                {errors.contact_no && touched.contact_no ? (
                  <div className={styles.errorText}>{errors.contact_no}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className={
                  errors.username ||
                  errors.admission_no ||
                  errors.password ||
                  errors.email ||
                  errors.contact_no
                    ? styles.buttonDisabled
                    : styles.buttonSubmit
                }
                disabled={
                  errors.username ||
                  errors.admission_no ||
                  errors.password ||
                  errors.email ||
                  errors.contact_no
                    ? true
                    : false
                }
              >
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
            </Form>
          )}
        </Formik>
      </div>

      <footer className={styles.foot}>
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

export default Signup;
