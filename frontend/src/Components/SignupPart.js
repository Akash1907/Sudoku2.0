import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./SignupPart.css";
// import axios from "axios";


const SignupPart = (props) => {

  return (
    <div className="signupContainer">
      <div className="for">
        <div className="nameInput">
          <div className="usernameInput">
            <TextField
              label="Username"
              variant="outlined"
              value={props.username}
              onChange={(e) => props.setUsername(e.target.value)}
              sx={{ width: "35vh" }}
            />
          </div>
          <div className="nmeInput">
            <TextField
              label="Name"
              variant="outlined"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
              sx={{ width: "35vh" }}
            />
          </div>
        </div>
        <div className="passwordInput">
          <TextField
            label="Password"
            variant="outlined"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
            type="password"
            sx={{ width: "73vh" }}
          />
        </div>
        <div className="cnfPassword">
          <TextField
            label="Confirm Password"
            variant="outlined"
            value = {props.cnfPassword}
            onChange={(e) => props.setCnfPassword(e.target.value)}
            sx={{ width: "73vh" }}
          />
        </div>
      </div>
      <Dialog
        open={props.open1}
        keepMounted
        onClose={props.handleClose1}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Password doesn't Match"}</DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose1}>OKAY</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.open3}
        keepMounted
        onClose={props.handleClose3}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please enter the Username"}</DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose3}>OKAY</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.open4}
        keepMounted
        onClose={props.handleClose4}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please enter your name"}</DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose4}>OKAY</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.open5}
        keepMounted
        onClose={props.handleClose5}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please enter the correct username"}</DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose5}>OKAY</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.open2}
        keepMounted
        onClose={props.handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please enter the password"}</DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose2}>OKAY</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.open6}
        keepMounted
        onClose={props.handleClose6}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Username already exists"}</DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose6}>OKAY</Button>
        </DialogActions>
      </Dialog>
      <div className="signupBtn"></div>
    </div>
  );
};


export default SignupPart;
