import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ScorePage.css";
import Loader from "../Components/Loader";

function ScorePage() {
  var name = localStorage.getItem("name");
  var avatarUrl = localStorage.getItem("avatarUrl");
  var checkPage = true;
  var score = localStorage.getItem("score");
  var min = localStorage.getItem("minutes");
  var sec = localStorage.getItem("seconds");
  var difficulty = localStorage.getItem("difficulty");
  var rankCount = 1;

  const [topScorer, setTopScorer] = useState({});
  const [loading, setLoading] = useState(true);
  const getTopScorers = () => {
    axios
      .get("https://sudoku2-0-akash1907.vercel.app/topScores")
      .then((response) => {
        setTopScorer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getTopScorers();
  }, []);

  console.log("top scorers are", topScorer);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header name={name} avatarUrl={avatarUrl} checkPage={checkPage} />
          <div className="scoreboard">
            <div className="scoreboardContainer">
              <div className="insideScore">
                <div className = "scoreTitle">
                  <p className = "scoreTitle2">COMPLETED</p>
                </div>
                <div className="profile-pic">
                  <img
                    src={avatarUrl}
                    className="avatar-img"
                    alt="no img found"
                  />
                </div>
                <div className="userDetails">
                  <div className="credentials">
                    <p className="credentials2">NAME</p>
                    {/* <p className="credentials2">TIME</p> */}
                    <p className="credentials2">SCORE</p>
                    {/* <p className = 'credentials2'>DIFFICULTY</p> */}
                  </div>
                  <div className="values">
                    <p className="values2">{name ? name.charAt(0).toUpperCase() + name.slice(1) : ""}</p>
                    {/* <p className="values2">{min} : {sec}</p> */}
                    <p className="values2">{score}</p>
                    {/* <p className = 'values2'>{difficulty}</p> */}
                  </div>
                </div>
                <div className = 'btns'>
                <div className="replay-btn">
                  <Link to="/difficulty">
                    <button className="replay-btn2">REPLAY</button>
                  </Link>
                </div>
                <div className="leaderboardBtn">
                  <a href="#leaderboard">
                    <button className="leaderboardBtn2">LEADERBOARD</button>
                  </a>
                </div>
                </div>
              </div>
            </div>
            <div className="leaderboard-container" id="leaderboard">
              <div className="leaderboard-banner">
                <p className="leaderboard">LEADERBOARD</p>
              </div>
              <div className="top-scorer-container">
                {topScorer.map((i) => {
                  return (
                    <div className="top-scorer">
                      <p className="rank">{rankCount++}</p>
                      <img
                        src={i.avatarUrl}
                        alt="no img found"
                        className="avatar-leader-img"
                      />
                      <p className="player-leader-name">{i.name}</p>
                      <div className="leader-score-container">
                        <p className="player-leader-score">{i.score}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ScorePage;
