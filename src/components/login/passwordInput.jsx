import React from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./Login.module.css";
export default function PasswordInput() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.Pass + " " + styles.input}>
      <input
        value={password}
        id="password"
        placeholder="Password GOeesssafd"
        type={visible ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.passInput}
      />
      <div className={styles.eye} onClick={() => setVisible(!visible)}>
        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </div>
    </div>
  );
}
