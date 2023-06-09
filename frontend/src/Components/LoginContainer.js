import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import "./LoginContainer.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";


function LoginContainer(props) {
  localStorage.clear();
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const obj = {
    username : username,
    password : password
  }

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const userLogin = async () => {
    if(username === '' && password !== '')
    {
      setOpen1(true);
    }
    else if(password === '' && username !== '')
    {
      setOpen2(true);
    }
    else if(password === '' && username === '')
    {
      setOpen3(true);
    }
    else{
      (axios
        .post("https://sudoku2-0-akash1907.vercel.app/auth", obj)
        .then((response) => {
          console.log(response);
          console.log("login Success");
          localStorage.setItem("username",obj.username);
        }).then(() => NavigateToDifficulty())
        .catch((error) => {
          console.error(error);
          console.log("Credentials are not correct");
          alert('Username or password is incorrect');
        })
      )
    }
  };

  const guestClick = () =>{
    localStorage.setItem("username","guest");
    NavigateToDifficulty();
  }
  const navigate = useNavigate();
  const NavigateToDifficulty = () => {
    navigate("/difficulty");
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginContainer2">
          <div className="loginHeading">
            <p className="loginHeading2">Welcome Back!</p>
          </div>
          <div className="userID">
            <TextField id="outlined-basic" label="Username" variant="outlined" value = {username} onChange={(e) => setUsername(e.target.value)} sx =  {{width : "51vh"}} />
          </div>
          <div className="password">
            <TextField id="outlined-basi" label="Password" variant="outlined" type = 'password' value = {password} onChange={(e) => setPassword(e.target.value)} sx =  {{width : "51vh"}} />
          </div>
          <div className="signinBtn">
              <button className="signinBtn2" onClick={userLogin}>Login</button>
          </div>
          <Dialog
              open={open1}
              keepMounted
              onClose={handleClose1}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Please enter the username to login"}
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
                {"Please enter the password to login"}
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
                {"Please enter the username and password to login"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose3}>OKAY</Button>
              </DialogActions>
            </Dialog>
          <div className="guestBtn">
              <button className="guestBtn2" onClick = {guestClick}>Continue as guest</button>
          </div>
        </div>
      </div>
      <div className="signUp">
        <div className="signUp2">
          <p className="signUpPara">
            Don't have an account yet?{" "}
            <button className="signUpBtn" onClick={props.click}>
              SignUp
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginContainer;
