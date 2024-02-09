import { FC, useEffect, useState } from "react";
import styles from "./Content.module.css";

const ProgressBar: FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIncrement = Math.random() * (1 - 0.3) + 0.3;
      setProgress((prevProgress) => {
        const newProgress = prevProgress + randomIncrement;
        return newProgress >= 1 ? 1 : newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      className={`${styles.progress} w-full h-1.5 outline-1 absolute`}
      id="progress-bar"
      aria-label="Action Loading..."
      value={progress}
      tabIndex={-1}
    />
  );
};

export default ProgressBar;
