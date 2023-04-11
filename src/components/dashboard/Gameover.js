import React, { useEffect, useRef, useState} from 'react';
import styles from './styles.module.css'

const Gameover = () => {

  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.inputbox} style={{padding:"4vh 8vh 4vh"}}>
          <h3 className={styles.gameOver}>Game Over</h3>
        </div>
      </div>
    </section>
  )
}

export default Gameover;
