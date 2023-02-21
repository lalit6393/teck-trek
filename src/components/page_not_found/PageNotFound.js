import React from "react";
import pnfStyle from "./style.module.css";
import pagenotfound from "../../static_files/pagenotfound.png";
import { useNavigate } from "react-router-dom";
import Cloud from "../clouds/Cloud";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={pnfStyle.pageNotFound}>
      <Cloud/>
      <div style={{ flex: "1" }} />
      <div className={pnfStyle.pnfcontentPart}>
        <div className={pnfStyle.pnfImg}>
          <img src={pagenotfound} alt="page not found" width={"300px"}></img>
        </div>
        <div className={pnfStyle.pnftext}>
          <h1>Oops! you lost the route</h1>
        </div>
        <div className={pnfStyle.pnfButton}>
          <span onClick={() => navigate("/")}>Go to home</span>
        </div>
      </div>
      <div style={{ flex: "1" }} />
      {/* <div className={pnfStyle.footer}>
        <p>
          Designed & Developed by: <span>Nibble Computer Society</span>
        </p>
        <p>
          Alumni & Faculty, Visit: <span>Forum for Trekking</span>
        </p>
      </div> */}
      <footer>
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

export default PageNotFound;
