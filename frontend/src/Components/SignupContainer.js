import React from "react";
import { useState } from "react";
import "./SignupContainer.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function SignupContainer(props) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  const object = {
    username: username,
  };

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);

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
  const handleClose6 = () => {
    setOpen6(false);
  };

  const collectData = async () => {
    if (username === "") {
      setOpen3(true);
    } else if (name === "") {
      setOpen4(true);
    } else if (password === "") {
      setOpen2(true);
    } else if (password !== cnfPassword) {
      setOpen1(true);
    } else if (username.includes(" ")) {
      setOpen5(true);
    } else {
      axios
        .post("https://sudoku2-0-akash1907.vercel.app/signupAuth", object)
        .then((response) => {
          console.log(response);
          props.nextClick();
          localStorage.setItem("username", username);
          localStorage.setItem("name", name);
          localStorage.setItem("password", password);
        })
        .catch((error) => {
          console.error(error);
          setOpen6(true);
        });
    }
  };

  return (
    <>
      <div className="signup">
        <div className="signup2">
          <div className="signUpHead">
            <p className="signUpHead2">Sign Up</p>
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
          </div>
          <Dialog
            open={open1}
            keepMounted
            onClose={handleClose1}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Password doesn't Match"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose1}>OKAY</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open3}
            keepMounted
            onClose={handleClose3}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Please enter the Username"}</DialogTitle>
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
            <DialogTitle>{"Please enter your name"}</DialogTitle>
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
            <DialogTitle>{"Please enter the correct username"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose5}>OKAY</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open2}
            keepMounted
            onClose={handleClose2}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Please enter the password"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose2}>OKAY</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open6}
            keepMounted
            onClose={handleClose6}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Username already exists"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose6}>OKAY</Button>
            </DialogActions>
          </Dialog>
          <div className="signupBtn">
            <button className="signupBtn2" onClick={collectData}>
              Next
            </button>
          </div>
        </div>
        <div className="alreadyAcc">
          <p className="alreadyAcc2">
            Already have an account?{" "}
            <button className="loginBtn" onClick={props.loginClick}>
              Log In
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupContainer;
