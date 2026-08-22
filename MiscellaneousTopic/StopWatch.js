import { useState, useEffect, useRef } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const stop = () => {
    setIsRunning(false);
    setCount(0);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{count}</h1>

      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}