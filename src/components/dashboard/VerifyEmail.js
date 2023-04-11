import React, { useEffect, useRef, useState} from 'react';
import styles from './styles.module.css'

const VerifyEmail = () => {

  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.inputbox} style={{padding:"4vh 8vh 4vh"}}>
          <p className={styles.verify}>A link for email verification is sent on your email, Please verify your email.</p>
        </div>
      </div>
    </section>
  )
}

export default VerifyEmail;
