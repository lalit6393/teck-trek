import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const VerifiedEmail = () => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.inputbox} style={{ padding: "4vh 8vh 4vh" }}>
          <p className={styles.verify}>Email verified, Happy trekking</p>
        </div>
      </div>
    </section>
  );
};

export default VerifiedEmail;
