import React, { useState, useEffect } from 'react';

const Typewriter = ({ paragraphText, buttonText }) => {
  const [displayParagraph, setDisplayParagraph] = useState('');
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    const paragraphInterval = setInterval(() => {
      if (currentParagraphIndex < paragraphText.length) {
        setDisplayParagraph((prevParagraph) => prevParagraph + paragraphText[currentParagraphIndex]);
        setCurrentParagraphIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsAnimationFinished(true);
        clearInterval(paragraphInterval);
      }
    }, 100);
    return () => clearInterval(paragraphInterval);
  }, [paragraphText, currentParagraphIndex]);

  return (
    <>
      {
         <p>{displayParagraph}</p>
      }
      
      {isAnimationFinished && <button>{buttonText}</button>}
    </>
  );
};

export default Typewriter;