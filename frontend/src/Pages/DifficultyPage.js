import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DifficultyPage.css";
import Header from "../Components/Header";
import axios from "axios";


function DifficultyPage() {
  const [currentUser, setCurrentUser] = useState({});
 
  return (
    <>
      <div className="diffLevel">
        <div className="diffLevel2">
          <div className="diffHead">
            <p className="diffHead2">DIFFICULTY</p>
          </div>
          <div className="diffDesc">
            <p className="diffDesc2">How good are you at Sudoku?</p>
          </div>
          <div className="diffs">
            <Link to="/sudokuEasy" style={{ textDecoration: "none" }}>
              <p className="diffs2">I'm a beginner</p>
            </Link>
            <Link to="/sudokuMedium" style={{ textDecoration: "none" }}>
              <p className="diffs2">I'm okay</p>
            </Link>
            <Link to="/sudokuHard" style={{ textDecoration: "none" }}>
              <p className="diffs2">I'm a pro</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DifficultyPage;
