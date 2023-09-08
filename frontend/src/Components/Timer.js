import React, { useState, useEffect } from "react";

function Timer(props) {
  
  return (
    <div className="timerSection">
        <div className="timer">
            <div className="time">
                <p className="time-p">{props.hour < 10 ? "0" + props.hour : props.hour}</p>
            </div>
            <div className="midDot">:</div>
            <div className="time">
                <p className="time-p">{props.minutes < 10 ? "0" + props.minutes :props. minutes}</p>
            </div>
            <div className="midDot">:</div>
            <div className="time">
                <p className="time-p">{props.seconds < 10 ? "0" + props.seconds : props.seconds}</p>
            </div>
        </div>
    </div>
  )
}

export default Timer