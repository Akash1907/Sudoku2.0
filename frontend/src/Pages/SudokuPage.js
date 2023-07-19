import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { useNavigate, Link } from "react-router-dom";
import "./SudokuPage.css";
import Confetti from "../Components/Confetti";
import GameOver from "../Components/GameOver";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TimerIcon from "@mui/icons-material/Timer";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SudokuPage(props) {
  const [sudokuArr, setSudokuArr] = useState(getDeepCopy(props.initial));
  var name = localStorage.getItem("name");
  var avatarUrl = localStorage.getItem("avatarUrl");
  var username = localStorage.getItem("username");
  var checkPage = true;
  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col) {
    var val = parseInt(e.target.value) || -1;
    let grid = getDeepCopy(sudokuArr);
    if (row != undefined && col != undefined) {
      if (val === -1 || (val >= 1 && val <= 9)) {
        grid[row][col] = val;
      }
    }

    setSudokuArr(grid);
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    var arr = store;
    let filteredArr = arr.filter((el) => !(el[0] === row && el[1] === col));
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
    return col !== 8 ? [row, col + 1] : row != 8 ? [row + 1, 0] : [0, 0];
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

  const [checkSolve, setCheckSolve] = useState(false);
  function solveSudoku() {
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    setSudokuArr(sudoku);
    setCheckSolve(true);
    setStore([]);
  }

  //funtion to reset the sudoku
  function resetSudoku() {
    let sudoku = getDeepCopy(props.initial);
    setSudokuArr(sudoku);
    setSeconds(0);
    setMinutes(0);
    setHour(0);
    setCheckSolve(false);
    setStore([]);
    setDisplayHint(false);
  }

  //funtion to compare sudoku
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

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hour, setHour] = useState(0);
  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
      if (minutes == 59) {
        setHour(hour + 1);
        setMinutes(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  let check;
  function clickSubmit() {
    let sudoku = getDeepCopy(props.initial);
    solver(sudoku);
    let compare = compareSudoku(sudokuArr, sudoku);
    if (!compare.isComplete) {
      check = true;
    } else {
      check = false;
    }
  }

  var score;
  function setScore() {
    var min = minutes;
    var sec = seconds;
    if (!checkSolve) {
      score = props.score - (min * 10 + Math.floor(sec / 10));
    } else score = 0;
  }
  setScore();
  var obj = {
    score: score,
  };
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [triggerGameOver, setTriggerGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    clickSubmit();
    incorrectInput();
    if (check) {
      setOpen(true);
    } else {
        setTriggerConfetti(!triggerConfetti);
        if (username != "guest") {
          setTimeout(() => {
            event.preventDefault();
            console.log("User-Score:", score);
            axios
              .post(`https://sudoku2-0-akash1907.vercel.app/setScore/${username}`, obj)
              .then((response) => {
                localStorage.setItem("score", score);
                console.log(response);
                console.log("score pushed Success");
              })
              .catch((error) => {
                console.error(error);
                console.log("Scores couldn't pushed");
              })
              .then(() => NavigateToScore());
          }, 3500);
        } else {
          setTimeout(() => {
            event.preventDefault();
            console.log("User-Score:", score);
            localStorage.setItem("score", score);
            NavigateToScore();
          }, 3500);
        }
      }
    }
  

  const navigate = useNavigate();
  const NavigateToScore = () => {
    navigate("/scores");
  };

  const [store, setStore] = useState([]);
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

  const [displayHint, setDisplayHint] = useState(false);
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
            {
              regArray.push(sudokuArr[i][j]);
            }
          }
        }
      }
      if (row <= 2 && col > 2 && col < 6) {
        for (let i = 0; i < 3; i++) {
          for (let j = 3; j < 6; j++) {
            {
              regArray.push(sudokuArr[i][j]);
            }
          }
        }
      }
      if (row <= 2 && col > 5) {
        for (let i = 0; i < 3; i++) {
          for (let j = 6; j < 9; j++) {
            {
              regArray.push(sudokuArr[i][j]);
            }
          }
        }
      }
      if (row > 2 && row < 6 && col <= 2) {
        for (let i = 3; i < 6; i++) {
          for (let j = 0; j < 3; j++) {
            {
              regArray.push(sudokuArr[i][j]);
            }
          }
        }
      }
      if (row > 2 && row < 6 && col > 2 && col < 6) {
        for (let i = 3; i < 6; i++) {
          for (let j = 3; j < 6; j++) {
            {
              regArray.push(sudokuArr[i][j]);
            }
          }
        }
      }
      if (row > 2 && row < 6 && col > 5) {
        for (let i = 3; i < 6; i++) {
          for (let j = 6; j < 9; j++) {
            {
              regArray.push(sudokuArr[i][j]);
            }
          }
        }
      }
      if (row > 5 && col <= 2) {
        for (let i = 6; i < 9; i++) {
          for (let j = 0; j < 3; j++) {
            {
              regArray.push(sudokuArr[i][j]);
            }
          }
        }
      }
      if (row > 5 && col > 2 && col < 6) {
        for (let i = 6; i < 9; i++) {
          for (let j = 3; j < 6; j++) {
            {
              regArray.push(sudokuArr[i][j]);
            }
          }
        }
      }
      if (row > 5 && col > 5) {
        for (let i = 6; i < 9; i++) {
          for (let j = 6; j < 9; j++) {
            {
              regArray.push(sudokuArr[i][j]);
            }
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
        if (flag != true) {
          mainOut.push(i + 1);
        }
      }
    }
    return mainOut;
  }

  const [isFocused, setIsFocused] = useState(false);
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

  const [isSlidingVisible, setSlidingVisible] = useState(false);
  const handleSlideButtonClick = () => {
    setSlidingVisible(!isSlidingVisible);
  };

  return (
    <>
      <Header name={name} avatarUrl={avatarUrl} checkPage={checkPage} />
      {triggerConfetti && <Confetti />}
      {triggerGameOver && <GameOver />}
      <div className="sudokuCont">
        <div className="leftSection">
          <div className="timer-container">
            <div className="timer">
              <TimerIcon
                sx={{ height: "3rem", width: "3rem", color: "#6CAAD9" }}
                className="timer-icon"
              />
              <div className="time">
                <p className="time-p">{hour < 10 ? "0" + hour : hour}</p>
              </div>
              <div className="midDot">:</div>
              <div className="time">
                <p className="time-p">
                  {minutes < 10 ? "0" + minutes : minutes}
                </p>
              </div>
              <div className="midDot">:</div>
              <div className="time">
                <p className="time-p">
                  {seconds < 10 ? "0" + seconds : seconds}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sudoku-container">
        
          <div className="midSection">
            <div className="App-header">
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
            <div className="submit-btn">
              <Button
                variant="outlined"
                onClick={handleSubmit}
                sx={{
                  marginTop: "2vh",
                  fontFamily: "Nunito",
                  backgroundColor: "#6CAAD9",
                  color: "white",
                  height: "6vh",
                  width: "63vh",
                  fontSize: "2rem",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "white",
                    color: "#6CAAD9",
                    border: "4px solid #6CAAD9",
                    fontWeight: "400",
                  },
                }}
              >
                SUBMIT
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>
                  {"Your SUDOKU is either not completed or wrong. Keep Trying!"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose}>OKAY</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div className="slidingContainer">
            <button
              className={
                isSlidingVisible ? "optionsBtnOpen" : "optionsBtnClose"
              }
              onClick={handleSlideButtonClick}
            >
              OPTIONS
            </button>

            <div
              className={
                isSlidingVisible ? "rightSectionOpen" : "rightSectionClose"
              }
            >
              <div className="iconBtn">
                <div className="iconBtn2">
                  <TipsAndUpdatesRoundedIcon
                    onClick={clickHint}
                    sx={{
                      height: "7vh",
                      width: "7vh",
                      border: "4px solid white",
                      borderRadius: "15px",
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                  <div className="kk">
                    <span className="tooltiptext">Hint</span>
                  </div>
                </div>
                <div className="iconBtn2">
                  <RestartAltRoundedIcon
                    onClick={resetSudoku}
                    sx={{
                      height: "7vh",
                      width: "7vh",
                      border: "4px solid white",
                      borderRadius: "15px",
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                  <div className="kk">
                    <span className="tooltiptext">Reset</span>
                  </div>
                </div>
                <div className="iconBtn2">
                  <CheckCircleRoundedIcon
                    onClick={solveSudoku}
                    sx={{
                      height: "7vh",
                      width: "7vh",
                      border: "4px solid white",
                      borderRadius: "15px",
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                  <div className="kk">
                    <span className="tooltiptext">Solve</span>
                  </div>
                </div>
                <div className="iconBtn2">
                  <Link to="/difficulty">
                    <PlayArrowRoundedIcon
                      sx={{
                        height: "7vh",
                        width: "7vh",
                        border: "4px solid white",
                        borderRadius: "15px",
                        cursor: "pointer",
                        color: "white",
                      }}
                    />
                  </Link>
                  <div className="kk">
                    <span className="tooltiptext">Re-Play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SudokuPage;
