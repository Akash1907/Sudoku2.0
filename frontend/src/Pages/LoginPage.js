import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useUser } from "../context/UserContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
    localStorage.clear();

  const object = {
    username: username,
    password: password,
  };
  const { setUser } = useUser();
  useEffect(() => {
    setUser('');
  }, [setUser]);
  
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

  const userLogin = async () => {
    if (username === "" && password !== "") {
      setOpen1(true);
    } else if (password === "" && username !== "") {
      setOpen2(true);
    } else if (password === "" && username === "") {
      setOpen3(true);
    } else {
      axios
        .post("https://sudoku2-0.vercel.app/auth", object)
        .then((response) => {
          console.log(response.data);
          console.log("login Success");
            setUser({
              username : object.username,
              name: response.data.name,
              avatarUrl: response.data.avatarUrl
            });
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('avatarUrl', response.data.avatarUrl);
            localStorage.setItem('username', object.username);
        })
        .then(() => NavigateToDifficulty())
        .catch((error) => {
          console.error(error);
          setOpen4(true);
        });
    }
  };

  const guestBtnClick = () => {
    NavigateToDifficulty();
    setUser({
      username : "guest",
      name: "guest",
      avatarUrl: "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
    });
    localStorage.setItem('name', 'Guest');
    localStorage.setItem('avatarUrl', 'https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg')
    localStorage.setItem('username', 'guest');
  };
  const navigate = useNavigate();
  const NavigateToDifficulty = () => {
    navigate("/difficulty");
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginContainer2">
          <div className="loginHeading">
            <p className="loginHeading2">
              <span className="welcome">Welcome </span>Back!
            </p>
          </div>
          <div className="userID">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: "51vh" }}
            />
          </div>
          <div className="password">
            <TextField
              id="outlined-basi"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "51vh" }}
            />
          </div>
          <div className="loginBtn">
            <button className="loginBtn2" onClick={userLogin}>
              Login
            </button>
          </div>
          <Dialog
            open={open1}
            keepMounted
            onClose={handleClose1}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Please enter the username to login"}</DialogTitle>
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
            <DialogTitle>{"Please enter the password to login"}</DialogTitle>
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
              {"Please enter the username and password to login"}
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
            <DialogTitle>{"Username or password is incorrect"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose4}>OKAY</Button>
            </DialogActions>
          </Dialog>
          <div className="guestBtn">
            <button className="guestBtn2" onClick={guestBtnClick}>
              Continue as guest
            </button>
          </div>
        </div>
      </div>
      <div className="signUp">
        <div className="signUp2">
          <p className="signUpPara">
            Don't have an account yet?
          </p>
          <Link to="/signup" style={{ textDecoration: "none"}}>
              <p className = 'navigateToSignup'>SignUp</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
