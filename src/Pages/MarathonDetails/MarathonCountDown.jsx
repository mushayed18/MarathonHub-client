import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const daySeconds = 86400; 
const hourSeconds = 3600; 
const minuteSeconds = 60; 

const MarathonCountdown = ({ countdownEndDate }) => {
  const [remainingTime, setRemainingTime] = useState(
    Math.floor((countdownEndDate - new Date()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (remainingTime <= 0) {
    return (
      <h1 className="text-center text-2xl font-bold text-sky-500">
        The marathon has started!
      </h1>
    );
  }

  const days = Math.floor(remainingTime / daySeconds);
  const hours = Math.floor((remainingTime % daySeconds) / hourSeconds);
  const minutes = Math.floor((remainingTime % hourSeconds) / minuteSeconds);
  const seconds = remainingTime % minuteSeconds;

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold text-sky-500 pb-5">
        Marathon starts in
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div>
          <CountdownCircleTimer
            isPlaying
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            colors="#0EA5E9"
            size={120}
            strokeWidth={10}
          >
            {() => (
              <div className="text-center">
                <div className="text-2xl font-bold">{days}</div>
                <div className="text-sm">Days</div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>

        <div>
          <CountdownCircleTimer
            isPlaying
            duration={hourSeconds}
            initialRemainingTime={remainingTime % daySeconds}
            colors="#0EA5E9"
            size={120}
            strokeWidth={10}
          >
            {() => (
              <div className="text-center">
                <div className="text-2xl font-bold">{hours}</div>
                <div className="text-sm">Hours</div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>

        <div>
          <CountdownCircleTimer
            isPlaying
            duration={minuteSeconds} 
            initialRemainingTime={remainingTime % hourSeconds}  
            colors="#0EA5E9"
            size={120}
            strokeWidth={10}
          >
            {() => (
              <div className="text-center">
                <div className="text-2xl font-bold">{minutes}</div>
                <div className="text-sm">Minutes</div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>

        <div>
          <CountdownCircleTimer
            isPlaying
            duration={minuteSeconds}  
            initialRemainingTime={remainingTime % minuteSeconds}  
            colors="#00FFFF"
            size={120}
            strokeWidth={10}
          >
            {() => (
              <div className="text-center">
                <div className="text-2xl font-bold">{seconds}</div>
                <div className="text-sm">Seconds</div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      </div>
    </div>
  );
};

export default MarathonCountdown;
