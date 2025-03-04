import { useEffect, useRef, useState } from "react";

function Timer({stop}) {
  const [seconds, setSeconds] = useState(0);
  const intervalID = useRef(null);

  if (stop) clearInterval(intervalID.current);

  function convertTime() {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(
      2,
      "0"
    )}`;
  }

  useEffect(() => {
    // timer setup
    intervalID.current = setInterval(
      () => setSeconds((seconds) => seconds + 1),
      1000
    );
    return () => clearInterval(intervalID.current);
  }, []);

  return <h1>{convertTime(seconds)}</h1>;
}

export default Timer;
