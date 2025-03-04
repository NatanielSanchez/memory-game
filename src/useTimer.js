import { useEffect, useRef, useState } from "react";

function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const intervalID = useRef(null);

  function convertTime() {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(
      2,
      "0"
    )}`;
  }

  function stopTimer() {
    clearInterval(intervalID.current);
  }

  useEffect(() => {
    // timer setup
    intervalID.current = setInterval(
      () => setSeconds((seconds) => seconds + 1),
      1000
    );
    return () => clearInterval(intervalID.current);
  }, []);

  return { seconds, convertTime, stopTimer };
}

export default useTimer;
