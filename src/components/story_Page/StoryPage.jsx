import React, { useState, useEffect } from "react";
import StoryStyle from "./style.module.css";
import Arrow from "../../static_files/Group.svg";
import { Link } from "react-router-dom";

const TypingContent = ({ text, show, setIsAnimationFinished }) => {
  const [index, setIndex] = useState(0);
  console.log(text.length);
  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setIsAnimationFinished(true);
    }
  }, [show]);

  return (
    <p style={{ display: show ? "block" : "none" }}>{text.slice(0, index)}</p>
  );
};

const Typewriter = ({ text }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return <span>{text.slice(0, index)}</span>;
};

const TypingButton = ({ text, show }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [show]);
  return (
    <div className={StoryStyle.buttonContainer}>
      <div style={{ display: show ? "block" : "none" }}>
        <button className={StoryStyle.button}>
          <span className={StoryStyle.text}>{text}</span>
          <img src={Arrow} />
        </button>
      </div>
    </div>
  );
};

const StoryPage = () => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
      const timeout2 = setTimeout(() => {
        setShowButton(true);
      }, 50200);
      return () => clearTimeout(timeout2);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={StoryStyle.outermostDiv}>
      <div className={StoryStyle.innermostDiv}>
        <div className={StoryStyle.innerDiv}>
          <h1 className={StoryStyle.heading}>
            <Typewriter text="Can you be the wisest Minister out there?" />
          </h1>
          <p className={StoryStyle.para}>
            <TypingContent
              text="In the days of yore lived an old king looking for a new Minster. A series of challenges are made to choose the most suitable candidate for this post. The candidates are summoned and challenges are made in the form of questions divided into levels as we move up the castle floors. Each level, upon crossing, would award the candidate with a unique gem. Once you solve all the challenges and reach the final level, you get that special Ruby to swear as the new Minister under the king. "
              show={showContent}
              setIsAnimationFinished={setIsAnimationFinished}
            />
          </p>

          {isAnimationFinished && (
            <Link to="/login" className={StoryStyle.link}>
              <TypingButton
                text="Continue"
                show={showButton}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
