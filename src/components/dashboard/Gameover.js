import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const Gameover = () => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.inputbox} style={{ padding: "4vh 8vh 4vh" }}>
          <h3 className={styles.gameOver}>Trekking Over</h3>
          <p className={styles.verify}>See you soon in the recruitments</p>
        </div>
      </div>
    </section>
  );
};

export default Gameover;
