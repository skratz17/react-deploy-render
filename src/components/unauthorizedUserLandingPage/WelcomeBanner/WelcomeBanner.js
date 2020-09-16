import React, { useEffect, useState, useRef } from 'react';

import './WelcomeBanner.css';

const WELCOME_MESSAGES = [
  'Welcome to UHHHWUT',
  'Bienvenue à UHHHWUT',
  'UHHHWUTへようこそ',
  '歡迎來到UHHHWUT'
];

/*
How long you want your whole animation cycle to take, in ms.
One animation cycle consists of three steps:
  1) Welcome header being fully opaque
  2) Welcome header fading out to be fully transparent
  3) Welcome header fading back in to be fully visible
*/
const ANIMATION_DURATION = 5000;

// How long into the ANIMATION_DURATION that you want to begin the fading out animation, in ms.
const FADE_OUT_POINT = 3000;

// How long into the ANIMATION_DURATION that you want to begin the fading back in animation, in ms.
const FADE_IN_POINT = 4000;

const WelcomeBanner = () => {
  const [ welcomeMessageIndex, setWelcomeMessageIndex ] = useState(0);

  const welcomeHeader = useRef(null);

  useEffect(() => {
    let start;
    let prev;
    let animationId;
    let hasResetWelcomeMessage = false;

    const animationCallback = timestamp => {
      if(start === undefined) start = timestamp;
      if(prev === undefined) prev = 0;
      const elapsed = timestamp - start;

      if(elapsed >= FADE_OUT_POINT && elapsed <= ANIMATION_DURATION) {
        let opacity;
        prev = elapsed;
        if(elapsed <= FADE_IN_POINT) {
          opacity = 1 - ((elapsed - FADE_OUT_POINT) / (FADE_IN_POINT - FADE_OUT_POINT));
        }
        else {
          if(!hasResetWelcomeMessage) {
            setWelcomeMessageIndex(prevIndex => prevIndex + 1 >= WELCOME_MESSAGES.length ? 0 : prevIndex + 1);
            hasResetWelcomeMessage = true;
          }
          opacity = (elapsed - FADE_IN_POINT) / (ANIMATION_DURATION - FADE_IN_POINT);
        }
        welcomeHeader.current.style.opacity = opacity;
      }

      if(elapsed > ANIMATION_DURATION) {
        start = undefined;
        hasResetWelcomeMessage = false;
      }
      animationId = requestAnimationFrame(animationCallback);
    }

    animationId = requestAnimationFrame(animationCallback);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="welcomeBanner">
      <h2 className="welcomeBanner__header" ref={welcomeHeader} style={{ opacity: 1 }}>{WELCOME_MESSAGES[welcomeMessageIndex]}</h2>
      <p className="welcomeBanner__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus unde reprehenderit voluptates eveniet aliquam sapiente, quos quisquam expedita ipsum nemo repudiandae autem sed quidem, nam iste? Maxime, alias commodi!</p>
    </div>
  );
};

export default WelcomeBanner;