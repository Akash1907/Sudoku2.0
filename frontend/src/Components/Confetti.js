import React from "react";
import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import congratulations from "../Audios/congratulations.mp3";

const Confetti = () => {
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);
  return (
    <>
      <div
        className="congrats-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="congratulation2.png"
          alt="no img found"
          style={{
            fontSize: "40px",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "5",
            height: "25rem",
            width: "35rem",
            marginTop: "25rem",
          }}
        />
      </div>
      <div>
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
      </div>
      <AudioPlayer
        className="audioFile"
        autoPlay
        src={congratulations}
        volume={1}
      />
    </>
  );
};

export default Confetti;
