import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./GameOver.css";
import gameOver from "../Audios/gameOver.wav";
function GameOver() {
  
  return (
    <div className="gameOver-container">
      <img src="gameOver.png" alt="no img found" className="gameOver-img" />
      <AudioPlayer className="audioFile" autoPlay src={gameOver} volume={1} />
    </div>
  );
}

export default GameOver;
