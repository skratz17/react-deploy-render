import React, { useEffect, useState, useRef } from 'react';

import './WelcomeBanner.css';

const WELCOME_MESSAGES = [
  'Welcome to UHHHWUT',
  'Bienvenue à UHHHWUT',
  'UHHHWUTへようこそ',
  '歡迎來到UHHHWUT'
];

const WelcomeBanner = () => {
  const [ welcomeMessageIndex, setWelcomeMessageIndex ] = useState(0);
  const [ isFadeOut, setIsFadeOut ] = useState(false);

  const welcomeHeader = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsFadeOut(true);
    }, 4000);

    return () => { clearTimeout(timeoutId); };
  }, [ welcomeMessageIndex ]);

  useEffect(() => {
    let timeoutId;
    let animationId;

    if(isFadeOut) {
      let start;
      let prev;

      const animationCallback = timestamp => {
        if(start === undefined) start = timestamp;
        const elapsed = timestamp - start;

        if(prev === undefined || Math.floor(elapsed / 50) > prev) {
          prev = Math.floor(elapsed / 100);
          let factor;
          if(elapsed <=1000) {
            factor = 1 - (elapsed / 1000);
          }
          else {
            factor = elapsed / 2000;
          }
          welcomeHeader.current.style.opacity = factor;
        }

        if(elapsed < 2000) {
          requestAnimationFrame(animationCallback);
        }
      }

      animationId = requestAnimationFrame(animationCallback);

      timeoutId = setTimeout(() => {
        setWelcomeMessageIndex(prevIndex => prevIndex + 1 >= WELCOME_MESSAGES.length ? 0 : prevIndex + 1);
        setIsFadeOut(false);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [ isFadeOut ]);

  return (
    <div className="welcomeBanner">
      <h2 className="welcomeBanner__header" ref={welcomeHeader} style={{ opacity: 1 }}>{WELCOME_MESSAGES[welcomeMessageIndex]}</h2>
      <p className="welcomeBanner__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus unde reprehenderit voluptates eveniet aliquam sapiente, quos quisquam expedita ipsum nemo repudiandae autem sed quidem, nam iste? Maxime, alias commodi!</p>
    </div>
  );
};

export default WelcomeBanner;