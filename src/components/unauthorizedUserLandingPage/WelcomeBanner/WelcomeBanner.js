import React, { useEffect, useState } from 'react';

const WELCOME_MESSAGES = [
  'Welcome to UHHHWUT',
  'Bienvenue à UHHHWUT',
  'UHHHWUTへようこそ',
  '歡迎來到UHHHWUT'
];

const WelcomeBanner = () => {
  const [ welcomeMessageIndex, setWelcomeMessageIndex ] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWelcomeMessageIndex(prevIndex => prevIndex + 1 >= WELCOME_MESSAGES.length ? 0 : prevIndex + 1);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="welcomeBanner">
      <h2 className="welcomeBanner__header">{WELCOME_MESSAGES[welcomeMessageIndex]}</h2>
      <p className="welcomeBanner__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus unde reprehenderit voluptates eveniet aliquam sapiente, quos quisquam expedita ipsum nemo repudiandae autem sed quidem, nam iste? Maxime, alias commodi!</p>
    </div>
  );
};

export default WelcomeBanner;