import React from 'react';
import cloudStyle from "./style.module.css";
import clouds from "../../static_files/clouds.svg";

const Cloud = () => {
  return (
    <>
    <div className={cloudStyle.cloud}>
    <img src={clouds} alt='clouds'></img>
  </div>
  <div className={cloudStyle.cloud}>
  <img src={clouds} alt='clouds'></img>
  </div>
  <div className={cloudStyle.cloud}>
  <img src={clouds} alt='clouds'></img>
  </div>
  </>
  )
}

export default Cloud;
