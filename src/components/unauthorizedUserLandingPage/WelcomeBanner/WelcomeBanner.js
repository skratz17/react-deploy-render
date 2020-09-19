import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import './WelcomeBanner.css';

// The welcome messages to animate between for the component.
const WELCOME_MESSAGES = [
  'Welcome to UHHHWUT',
  'Bienvenue à UHHHWUT',
  'UHHHWUT へようこそ',
  '歡迎來到 UHHHWUT'
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

  // start the animation on initial render of WelcomeBanner component
  useEffect(() => {
    let animationId;
    let start = null;
    let hasResetWelcomeMessage = false;

    const calculateOpacity = elapsed => {
      if(elapsed <= FADE_IN_POINT) {
        return 1 - ((elapsed - FADE_OUT_POINT) / (FADE_IN_POINT - FADE_OUT_POINT));
      }
      else {
        return (elapsed - FADE_IN_POINT) / (ANIMATION_DURATION - FADE_IN_POINT);
      }
    };

    const restartAnimationCycle = () => {
      start = null;
      hasResetWelcomeMessage = false;
    };

    const animationCallback = timestamp => {
      if(!start) start = timestamp;
      const elapsed = timestamp - start;

      // if the current point in the animation cycle indicates we should be either fading out or back in, update the opacity of the welcome banner header 
      if(elapsed >= FADE_OUT_POINT && elapsed <= ANIMATION_DURATION) {
        welcomeHeader.current.style.opacity = calculateOpacity(elapsed);

        // if we have faded out but not yet updated the header to be the next item in WELCOME_MESSAGES array, do that now
        if(!hasResetWelcomeMessage && elapsed >= FADE_IN_POINT) {
          setWelcomeMessageIndex(prevIndex => prevIndex + 1 >= WELCOME_MESSAGES.length ? 0 : prevIndex + 1);
          hasResetWelcomeMessage = true;
        }
      }

      else if(elapsed > ANIMATION_DURATION) {
        restartAnimationCycle();
      }

      animationId = requestAnimationFrame(animationCallback);
    };

    animationId = requestAnimationFrame(animationCallback);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="welcomeBanner">
      <h2 className="welcomeBanner__header" ref={welcomeHeader} style={{ opacity: 1 }}>{WELCOME_MESSAGES[welcomeMessageIndex]}</h2>
      <p className="welcomeBanner__text">
        <FormattedMessage id="welcomeBanner.text"
          defaultMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus unde reprehenderit voluptates eveniet aliquam sapiente, quos quisquam expedita ipsum nemo repudiandae autem sed quidem, nam iste? Maxime, alias commodi!" />
      </p>
    </div>
  );
};

export default WelcomeBanner;