import React from "react";
import { useState, useEffect } from "react";
import "./SignupContainer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function SignupContainer(props) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [score, setScore] = useState([]);
  const [cnfPassword, setCnfPassword] = useState("");
  const [userAvatarUrl, setUserAvatarUrl] = useState("");
  const [avatarData, setAvatarData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOptionClick = (value) => {
    setUserAvatarUrl(value);
  };

  const obj = {
    username: username,
    name: name,
    password: password,
    avatarUrl: userAvatarUrl,
    score: score,
  };

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClose5 = () => {
    setOpen5(false);
  };

  const collectData = async () => {
    if (password !== cnfPassword) {
      // alert("Password doesn't Match");
      setOpen1(true);
    } else if (userAvatarUrl === "") {
      // alert("Plase select a Avatar");
      setOpen2(true);
    } else if (username === "") {
      // alert("Please enter the Username");
      setOpen3(true);
    } else if (name === "") {
      // alert("Please enter your name");
      setOpen4(true);
    } else if (username.includes(" ")) {
      // alert("Please enter the correct username");
      setOpen5(true);
    } else
      axios
        .post("https://sudoku2-0-akash1907.vercel.app/register", obj)
        .then((response) => {
          // setUserData(response.data);
          console.log(response);
          localStorage.setItem("username", obj.username);
        })
        .then(() => NavigateToDifficulty())
        .catch((error) => {
          console.error(error);
          alert("Username already exists");
        });
  };

  const getAvatars = () => {
    axios
      .get("https://sudoku2-0-akash1907.vercel.app/getAvatars")
      .then((response) => {
        setAvatarData(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getAvatars();
  }, []);

  const navigate = useNavigate();
  const NavigateToDifficulty = () => {
    navigate("/difficulty");
  };

  return props.trigger3 ? (
    <>
      <div className="signup">
        <div className="signup2">
          <div className="signUpHead">
            <p className="signUpHead2">Welcome!</p>
          </div>
          <div className="signup3">
            <div className="signupContainer">
              <div className="for">
                <div className="nameInput">
                  <div className="usernameInput">
                    <TextField
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      sx={{ width: "35vh" }}
                    />
                  </div>
                  <div className="nmeInput">
                    <TextField
                      id="outlined-error-helper-text"
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ width: "35vh" }}
                    />
                  </div>
                </div>
                <div className="passwordInput">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    sx={{ width: "73vh" }}
                  />
                </div>
                <div className="cnfPassword">
                  <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    onChange={(e) => setCnfPassword(e.target.value)}
                    sx={{ width: "73vh" }}
                  />
                </div>
              </div>
            </div>
            <div className="line"></div>
            <div className="avatarContainer">
              <div className="avatarPara">
                <p className="avatarPara2">Please Select an Avatar</p>
              </div>
              <div className="avatarImages">
                <div className="listOfImg">
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      {avatarData?.map((i) => {
                        return (
                          <img
                            className="avatarImg"
                            id={userAvatarUrl === i.url ? "selected" : ""}
                            onClick={() => handleOptionClick(i.url)}
                            src={i.url}
                          />
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Dialog
              open={open1}
              keepMounted
              onClose={handleClose1}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Password doesn't Match"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose1}>OKAY</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open2}
              keepMounted
              onClose={handleClose2}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Please select a Avatar"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose2}>OKAY</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open3}
              keepMounted
              onClose={handleClose3}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Please enter the Username"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose3}>OKAY</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open4}
              keepMounted
              onClose={handleClose4}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Please enter your name"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose4}>OKAY</Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={open5}
              keepMounted
              onClose={handleClose5}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Please enter the correct username"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose5}>OKAY</Button>
              </DialogActions>
            </Dialog>
          <div className="signupBtn">
            <button className="signupBtn2" onClick={collectData}>
              Sign Up
            </button>
          </div>
        </div>
        <div className="alreadyAcc">
          <p className="alreadyAcc2">
            Already have an account?{" "}
            <button
              className="loginBtn"
              onClick={() => props.setTrigger3(false)}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default SignupContainer;
