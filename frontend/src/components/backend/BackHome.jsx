import React, { useState, useEffect } from 'react';

function BackHome() {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="backstage-home">
      <div className="welcome-banner">
        <h1>Welcome to the Backstage, Amethyst!</h1>
      </div>
      <div className="content">
        <div className="greeting">
          <h2>Today is {currentTime.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );
}


export default BackHome;
