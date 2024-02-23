import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SudokuPage.css";
import Confetti from "../Components/Confetti";
import Timer from "../Components/Timer";
import axios from "axios";
import { useUser } from "../context/UserContext";
import SubmitBtn from "../Components/SubmitBtn";
import HintBtn from "../Components/HintBtn";
import ResetBtn from "../Components/ResetBtn";
import SolveBtn from "../Components/SolveBtn";
import ReplayBtn from "../Components/ReplayBtn";

function SudokuPage(props) {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(props.initial));
  const [store, setStore] = useState([]);
  const [checkSolveClick, setCheckSolveClick] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [displayHint, setDisplayHint] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSlidingVisible, setSlidingVisible] = useState(false);
  const {user, setUser} = useUser();
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hour, setHour] = useState(0);

  const username = user ? user.username : "";

  const handleClose = () => {
    setOpen(false);
  };

  var object = {
    score: setScore(),
  };

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    var val = parseInt(e.target.value) || -1;
    let grid = getDeepCopy(sudokuArr);
    if (row !== undefined && col !== undefined) {
      if (val === -1 || (val >= 1 && val <= 9)) {
        grid[row][col] = val;
      }
    }
    setSudokuArr(grid);
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    let filteredArr = store.filter((el) => !(el[0] === row && el[1] === col));
    setStore(filteredArr);
    // checkHint(e);
    setIsFocused(true);
  }

  function checkRow(grid, row, num) {
    return grid[row].indexOf(num) === -1;
  }

  //check  num is unique in column
  function checkCol(grid, col, num) {
    return grid.map((row) => row[col]).indexOf(num) === -1;
  }

  //check num is uniques in box
  function checkBox(grid, row, col, num) {
    let boxArr = [],
      rowStart = row - (row % 3),
      colStart = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        //get all the cell numbers and push to boxArr
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }
    return boxArr.indexOf(num) === -1;
  }

  function checkValid(grid, row, col, num) {
    //num should be unique in row, col and in the square 3x3.
    if (
      checkRow(grid, row, num) &&
      checkCol(grid, col, num) &&
      checkBox(grid, row, col, num)
    ) {
      return true;
    }
    return false;
  }

  function getNext(row, col) {
    //if col reaches 8 increase row number
    //if row reaches 8 and col reaches 8 , next will be [0, 0]
    //if col doesn't reach 8, increase col number
    return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
  }

  //recursive fn to solve sudoku
  function solver(grid, row = 0, col = 0) {
    //if the current cell is already filled, move to next cell
    if (grid[row][col] !== -1) {
      // for last cell, don't solve it
      let isLast = row >= 8 && col >= 8;
      if (!isLast) {
        let [newRow, newCol] = getNext(row, col);
        return solver(grid, newRow, newCol);
      }
    }
    for (let num = 1; num <= 9; num++) {
      //check if this number is satisfying sudoku constraints
      if (checkValid(grid, row, col, num)) {
        //fill the num in that cell
        grid[row][col] = num;
        //get next cell and repeat the function
        let [newRow, newCol] = getNext(row, col);
        if (!newRow && !newCol) {
          return true;
        }
        if (solver(grid, newRow, newCol)) {
          return true;
        }
      }
    }
    //if it is invalid fill with -1
    grid[row][col] = -1;
    return false;
  }

  function solveSudoku() {
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    setSudokuArr(sudoku);
    setCheckSolveClick(true);
    setStore([]);
  }

  //funtion to reset the sudoku
  function resetSudoku() {
    let sudoku = getDeepCopy(props.initial);
    setSudokuArr(sudoku);
    setCheckSolveClick(false);
    setStore([]);
    setDisplayHint(false);
    // setCheckResetClick((prev) => !prev);
    setMinutes(0);
    setSeconds(0);
    setHour(0);
  }

  //function to compare sudoku
  function compareSudoku(currentSudoku, solvedSudoku) {
    let res = {
      isComplete: true,
      isSolvable: true,
    };
    for (let i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
          if (currentSudoku[i][j] !== -1) {
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  function clickSubmit() {
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    let compare = compareSudoku(sudokuArr, sudoku);
    if (!compare.isComplete) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    var timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
      if (minutes === 59) {
        setHour(hour + 1);
        setMinutes(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  function setScore() {
    let score = 0;
    if (!checkSolveClick) {
      score = props.score - (minutes * 10 + Math.floor(seconds / 10));
    }
    return score;
  }

  const handleSubmit = (event) => {
    incorrectInput();
    if (clickSubmit()) {
      setOpen(true);
    } else {
      setTriggerConfetti(!triggerConfetti);
      if (username !== "guest") {
        setTimeout(() => {
          event.preventDefault();
          console.log("User-Score:", setScore());
          axios
            .post(`https://sudoku2-0-akash1907.vercel.app/setScore/${username}`, object)
            .then((response) => {
              setScore();
              localStorage.setItem("score", setScore());
              console.log(user);
              console.log(response);
              console.log("Score Pushed Successfully");
            })
            .catch((error) => {
              console.error(error);
              console.log("Scores couldn't pushed");
            })
            .then(() => NavigateToScorePage());
        }, 3500);
      } else {
        setTimeout(() => {
          event.preventDefault();
          console.log("User-Score:", setScore());
          localStorage.setItem("score", setScore());
          NavigateToScorePage();
        }, 3500);
      }
    }
  };

  const navigate = useNavigate();
  const NavigateToScorePage = () => {
    navigate("/scores");
  };

  function incorrectInput() {
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (sudokuArr[i][j] !== sudoku[i][j] && sudokuArr[i][j] !== -1) {
          let rowCol = [i, j];
          var arr = store;
          arr.push(rowCol);
          setStore(arr);
        }
      }
    }
  }

  function checkWrong(row, col) {
    let containsElement = store.some((el) => el[0] === row && el[1] === col);
    return containsElement;
  }

  function clickHint() {
    setDisplayHint(!displayHint);
  }

  function checkHint(row, col) {
    var mainOut = [];
    var colArray = [];
    var rowArray = [];
    var regArray = [];
    if (props.initial[row][col] === -1) {
      for (let i = 0; i < 9; i++) {
        rowArray.push(sudokuArr[row][i]);
      }
      for (let i = 0; i < 9; i++) {
        colArray.push(sudokuArr[i][col]);
      }

      if (row <= 2 && col <= 2) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      if (row <= 2 && col > 2 && col < 6) {
        for (let i = 0; i < 3; i++) {
          for (let j = 3; j < 6; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      if (row <= 2 && col > 5) {
        for (let i = 0; i < 3; i++) {
          for (let j = 6; j < 9; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      if (row > 2 && row < 6 && col <= 2) {
        for (let i = 3; i < 6; i++) {
          for (let j = 0; j < 3; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      if (row > 2 && row < 6 && col > 2 && col < 6) {
        for (let i = 3; i < 6; i++) {
          for (let j = 3; j < 6; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      if (row > 2 && row < 6 && col > 5) {
        for (let i = 3; i < 6; i++) {
          for (let j = 6; j < 9; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      if (row > 5 && col <= 2) {
        for (let i = 6; i < 9; i++) {
          for (let j = 0; j < 3; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      if (row > 5 && col > 2 && col < 6) {
        for (let i = 6; i < 9; i++) {
          for (let j = 3; j < 6; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      if (row > 5 && col > 5) {
        for (let i = 6; i < 9; i++) {
          for (let j = 6; j < 9; j++) {
            regArray.push(sudokuArr[i][j]);
          }
        }
      }
      for (let i = 0; i < 9; i++) {
        let flag = false;
        for (let j = 0; j < 9; j++) {
          if (
            rowArray[j] === i + 1 ||
            colArray[j] === i + 1 ||
            regArray[j] === i + 1
          ) {
            flag = true;
          }
        }
        if (flag !== true) {
          mainOut.push(i + 1);
        }
      }
    }
    return mainOut;
  }

  const myStyles = {
    1: { left: "0px", zIndex: 12 },
    2: { left: "20px", zIndex: 12 },
    3: { left: "40px", zIndex: 12 },
    4: { left: "40px", top: "18px", zIndex: 12 },
    5: { left: "40px", top: "35px", zIndex: 12 },
    6: { left: "20px", top: "35px", zIndex: 12 },
    7: { left: "0px", top: "35px", zIndex: 12 },
    8: { left: "0px", top: "18px", zIndex: 12 },
    9: { left: "20px", top: "18px", zIndex: 12 },
  };

  function handleBlur() {
    setIsFocused(false);
  }

  const handleSlideButtonClick = () => {
    setSlidingVisible(!isSlidingVisible);
  };

  return (
    <>
      {triggerConfetti && <Confetti />}
      <div className="sudokuContainer">
        <Timer minutes={minutes} hour={hour} seconds={seconds} />
        <div className="sudokuSection">
          <div className="sudoku">
            <div className="sudokuTable">
              <table>
                <tbody>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => {
                    return (
                      <tr
                        key={rIndex}
                        className={(row + 1) % 3 === 0 ? "bBorder" : ""}
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => {
                          return (
                            <td
                              key={rIndex + cIndex}
                              className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                            >
                              <div className="input-wrapper">
                                <input
                                  autoComplete="off"
                                  onChange={(e) => onInputChange(e, row, col)}
                                  value={
                                    sudokuArr[row][col] === -1
                                      ? ""
                                      : sudokuArr[row][col]
                                  }
                                  id="cellInput"
                                  style={
                                    checkWrong(row, col)
                                      ? { boxShadow: "inset 0 0 10px red" }
                                      : { borderColor: "#6CAAD9" }
                                  }
                                  disabled={props.initial[row][col] !== -1}
                                  className={
                                    (row <= 2 && col <= 2) ||
                                    (col <= 8 && col > 5 && row <= 2) ||
                                    (col >= 3 &&
                                      col <= 5 &&
                                      row >= 3 &&
                                      row <= 5) ||
                                    (col <= 2 && row > 5) ||
                                    (col > 5 && row > 5)
                                      ? "colorId"
                                      : ""
                                  }
                                  onFocus={onInputChange}
                                  onBlur={handleBlur}
                                />
                                {displayHint
                                  ? (sudokuArr[row][col] === -1
                                      ? ""
                                      : sudokuArr[row][col]) === "" &&
                                    Object.entries(myStyles).map(
                                      ([key, style]) =>
                                        checkHint(row, col).includes(
                                          parseInt(key)
                                        ) ? (
                                          <div key={key} style={style}>
                                            <div>{key}</div>
                                          </div>
                                        ) : (
                                          ""
                                        )
                                    )
                                  : ""}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="slidingContainer">
              <button
                className={
                  isSlidingVisible ? "optionsBtnOpen" : "optionsBtnClose"
                }
                onClick={handleSlideButtonClick}
              >
                <p className="options">OPTIONS</p>
              </button>

              <div
                className={
                  isSlidingVisible ? "rightSectionOpen" : "rightSectionClose"
                }
              >
                <div className="iconBtn">
                  <HintBtn clickHint={clickHint} />
                  <ResetBtn resetSudoku={resetSudoku} />
                  <SolveBtn solveSudoku={solveSudoku} />
                  <ReplayBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SubmitBtn
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          open={open}
        />
      </div>
    </>
  );
}

export default SudokuPage;
